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

package org.openqa.selenium.iphone;

import static org.openqa.selenium.testing.Ignore.Driver.IPHONE;
import static org.openqa.selenium.testing.Ignore.Driver.REMOTE;

import junit.framework.Test;
import junit.framework.TestSuite;

import org.openqa.selenium.TestSuiteBuilder;
import org.openqa.selenium.testing.InProject;

import java.io.File;

public class IPhoneDriverTestSuite extends TestSuite {

  public static Test suite() throws Exception {
    return new TestSuiteBuilder()
        .addSourceDir("java/client/test")
        .usingDriver(TestIPhoneSimulatorDriver.class)
        .exclude(IPHONE)
        .exclude(REMOTE)
        .keepDriverInstance()
        .includeJavascriptTests()
        .create();
  }

  public static class TestIPhoneSimulatorDriver extends IPhoneSimulatorDriver {
    public TestIPhoneSimulatorDriver() throws Exception {
      super(locateSimulatorBinary());
    }

    private static IPhoneSimulatorBinary locateSimulatorBinary() throws Exception {
      File iWebDriverApp = InProject.locate(
          "iphone/build/Release-iphonesimulator/iWebDriver.app/iWebDriver");
      return new IPhoneSimulatorBinary(iWebDriverApp);
    }
  }
}
