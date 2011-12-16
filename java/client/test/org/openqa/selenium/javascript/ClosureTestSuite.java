/*
Copyright 2010 WebDriver committers
Copyright 2010 Google Inc.

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

package org.openqa.selenium.javascript;

import com.google.common.base.Function;
import com.google.common.base.Throwables;

import junit.framework.Test;

import org.openqa.selenium.EnvironmentStarter;
import org.openqa.selenium.WebDriver;

public class ClosureTestSuite {

  public static Test suite() {
    Test suite = new JsTestSuiteBuilder()
        .withTestFactory(new Function<String, Test>() {
          public Test apply(String input) {
            return new ClosureTestCase(input);
          }
        })
        .build();
    return new EnvironmentStarter(suite);
  }
}
