package org.openqa.selenium.iphone;

import static org.openqa.selenium.testing.Ignore.Driver.IPHONE;
import static org.openqa.selenium.testing.Ignore.Driver.REMOTE;

import junit.framework.Test;
import junit.framework.TestSuite;

import org.openqa.selenium.TestSuiteBuilder;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.MalformedURLException;
import java.net.URL;

public class AlreadyRunningIPhoneDriverTestSuite extends TestSuite {
  public static Test suite() throws Exception {
    return new TestSuiteBuilder()
        .addSourceDir("java/client/test")
        .usingDriver(AlreadyRunningIPhoneDriver.class)
        .exclude(IPHONE)
        .exclude(REMOTE)
        .keepDriverInstance()
        .includeJavascriptTests()
        .create();
  }

  public static class AlreadyRunningIPhoneDriver extends RemoteWebDriver {
    public AlreadyRunningIPhoneDriver() throws MalformedURLException {
      super(new URL("http://localhost:3001/hub"), DesiredCapabilities.iphone());
    }
  }

}
