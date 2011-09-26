/*
Copyright 2007-2009 WebDriver committers
Copyright 2007-2009 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

package org.openqa.selenium.firefox;

import com.google.common.annotations.VisibleForTesting;
import com.google.common.collect.Maps;
import com.google.common.io.Closeables;
import com.google.common.io.LineReader;

import org.openqa.selenium.WebDriverException;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

class Preferences {

  /**
   * This pattern is used to parse preferences in user.js. It is intended to match all preference
   * lines in the format generated by Firefox; it won't necessarily match all possible lines that
   * Firefox will parse.
   * 
   * e.g. if you have a line with extra spaces after the end-of-line semicolon, this pattern will
   * not match that line because Firefox never generates lines like that.
   */
  private static final Pattern PREFERENCE_PATTERN =
      Pattern.compile("user_pref\\(\"([^\"]+)\", (\"?.+?\"?)\\);");

  private Map<String, Object> allPrefs = Maps.newHashMap();

  public Preferences() {
    // Nothing to do
  }

  public Preferences(File userPrefs) {
    FileReader reader = null;
    try {
      reader = new FileReader(userPrefs);
      readPreferences(reader);
    } catch (IOException e) {
      throw new WebDriverException(e);
    } finally {
      Closeables.closeQuietly(reader);
    }
  }

  public Preferences(Reader reader) {
    try {
      readPreferences(reader);
    } catch (IOException e) {
      throw new WebDriverException(e);
    } finally {
      Closeables.closeQuietly(reader);
    }
  }

  private void readPreferences(Reader reader) throws IOException {
    LineReader allLines = new LineReader(reader);
    String line = allLines.readLine();
    while (line != null) {
      Matcher matcher = PREFERENCE_PATTERN.matcher(line);
      if (matcher.matches()) {
        allPrefs.put(matcher.group(1), preferenceAsValue(matcher.group(2)));
      }
      line = allLines.readLine();
    }
  }

  public void setPreference(String key, String value) {
    if (isStringified(value)) {
      throw new IllegalArgumentException(
          String.format("Preference values must be plain strings: %s: %s",
              key, value));
    }
    allPrefs.put(key, value);
  }

  public void setPreference(String key, boolean value) {
    allPrefs.put(key, value);
  }

  public void setPreference(String key, int value) {
    allPrefs.put(key, value);
  }

  public void addTo(Preferences prefs) {
    // TODO(simon): Stop being lazy
    prefs.allPrefs.putAll(allPrefs);
  }

  public void addTo(FirefoxProfile profile) {
    profile.getAdditionalPreferences().allPrefs.putAll(allPrefs);
  }

  public void writeTo(Writer writer) throws IOException {
    for (Map.Entry<String, Object> pref : allPrefs.entrySet()) {
      writer.append("user_pref(\"").append(pref.getKey()).append("\", ");
      writer.append(valueAsPreference(pref.getValue()));
      writer.append(");\n");
    }
  }

  private String valueAsPreference(Object value) {
    if (value instanceof String) {
      return "\"" + value + "\"";
    }

    return String.valueOf(value);
  }

  private Object preferenceAsValue(String toConvert) {
    if (toConvert.startsWith("\"") && toConvert.endsWith("\"")) {
      return toConvert.substring(1, toConvert.length() - 1);
    }

    if ("false".equals(toConvert) || "true".equals(toConvert)) {
      return Boolean.parseBoolean(toConvert);
    }

    try {
      return Integer.parseInt(toConvert);
    } catch (NumberFormatException e) {
      throw new WebDriverException(e);
    }
  }

  @VisibleForTesting
  protected Object getPreference(String key) {
    return allPrefs.get(key);
  }

  private boolean isStringified(String value) {
    // Assume we a string is stringified (i.e. wrapped in " ") when
    // the first character == " and the last character == "
    return value.startsWith("\"") && value.endsWith("\"");
  }

  public void putAll(Map<String, Object> frozenPreferences) {
    allPrefs.putAll(frozenPreferences);
  }
}
