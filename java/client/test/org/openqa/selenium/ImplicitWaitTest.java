package org.openqa.selenium;

import static org.openqa.selenium.testing.Ignore.Driver.ANDROID;
import static org.openqa.selenium.testing.Ignore.Driver.CHROME;
import static org.openqa.selenium.testing.Ignore.Driver.HTMLUNIT;
import static org.openqa.selenium.testing.Ignore.Driver.IE;
import static org.openqa.selenium.testing.Ignore.Driver.IPHONE;
import static org.openqa.selenium.testing.Ignore.Driver.SELENESE;
import static org.openqa.selenium.testing.Ignore.Driver.OPERA;

import static java.util.concurrent.TimeUnit.MILLISECONDS;

import org.junit.Test;
import org.openqa.selenium.testing.Ignore;
import org.openqa.selenium.testing.JavascriptEnabled;

import java.util.List;

/**
 * @author jmleyba@gmail.com (Jason Leyba)
 */
@NeedsLocalEnvironment(reason =
    "Executing these tests over the wire doesn't work, because they relies on 100ms-specific timing")
public class ImplicitWaitTest extends AbstractDriverTestCase {

  @Override
  protected void setUp() throws Exception {
    super.setUp();

    driver.manage().timeouts().implicitlyWait(0, MILLISECONDS);
  }

  @Override
  protected void tearDown() throws Exception {
    driver.manage().timeouts().implicitlyWait(0, MILLISECONDS);

    super.tearDown();
  }

  @Test
  @JavascriptEnabled
  public void testShouldImplicitlyWaitForASingleElement() {
    driver.get(pages.dynamicPage);
    WebElement add = driver.findElement(By.id("adder"));

    driver.manage().timeouts().implicitlyWait(3000, MILLISECONDS);

    add.click();
    driver.findElement(By.id("box0")); // All is well if this doesn't throw.
  }

  @Test
  @JavascriptEnabled
  public void testShouldStillFailToFindAnElementWhenImplicitWaitsAreEnabled() {
    driver.get(pages.dynamicPage);
    driver.manage().timeouts().implicitlyWait(500, MILLISECONDS);
    try {
      driver.findElement(By.id("box0"));
      fail("Expected to throw.");
    } catch (NoSuchElementException expected) {
    }
  }

  @Test
  @JavascriptEnabled
  public void testShouldReturnAfterFirstAttemptToFindOneAfterDisablingImplicitWaits() {
    driver.get(pages.dynamicPage);
    driver.manage().timeouts().implicitlyWait(3000, MILLISECONDS);
    driver.manage().timeouts().implicitlyWait(0, MILLISECONDS);
    try {
      driver.findElement(By.id("box0"));
      fail("Expected to throw.");
    } catch (NoSuchElementException expected) {
    }
  }

  @Test
  @JavascriptEnabled
  public void testShouldImplicitlyWaitUntilAtLeastOneElementIsFoundWhenSearchingForMany() {
    driver.get(pages.dynamicPage);
    WebElement add = driver.findElement(By.id("adder"));

    driver.manage().timeouts().implicitlyWait(2000, MILLISECONDS);
    add.click();
    add.click();

    List<WebElement> elements = driver.findElements(By.className("redbox"));
    assertFalse(elements.isEmpty());
  }

  @Test
  @JavascriptEnabled
  public void testShouldStillFailToFindElementsWhenImplicitWaitsAreEnabled() {
    driver.get(pages.dynamicPage);
    driver.manage().timeouts().implicitlyWait(500, MILLISECONDS);
    List<WebElement> elements = driver.findElements(By.className("redbox"));
    assertTrue(elements.isEmpty());
  }

  @Test
  @JavascriptEnabled
  public void testShouldStillFailToFindElementsByIdWhenImplicitWaitsAreEnabled() {
    driver.get(pages.dynamicPage);
    driver.manage().timeouts().implicitlyWait(500, MILLISECONDS);
    List<WebElement> elements = driver.findElements(By.id("redbox"));
    assertTrue(elements.toString(), elements.isEmpty());
  }

  @Test
  @JavascriptEnabled
  public void testShouldReturnAfterFirstAttemptToFindManyAfterDisablingImplicitWaits() {
    driver.get(pages.dynamicPage);
    WebElement add = driver.findElement(By.id("adder"));

    driver.manage().timeouts().implicitlyWait(1100, MILLISECONDS);
    driver.manage().timeouts().implicitlyWait(0, MILLISECONDS);
    add.click();

    List<WebElement> elements = driver.findElements(By.className("redbox"));
    assertTrue(elements.isEmpty());
  }

  @Test
  @JavascriptEnabled
  @Ignore({ANDROID, CHROME, IE, IPHONE, SELENESE})
  public void testShouldImplicitlyWaitForAnElementToBeVisibleBeforeInteracting() {
    driver.get(pages.dynamicPage);

    WebElement reveal = driver.findElement(By.id("reveal"));
    WebElement revealed = driver.findElement(By.id("revealed"));
    driver.manage().timeouts().implicitlyWait(5000, MILLISECONDS);

    assertFalse("revealed should not be visible", revealed.isDisplayed());
    reveal.click();

    try {
      revealed.sendKeys("hello world");
      // This is what we want
    } catch (ElementNotVisibleException e) {
      fail("Element should have been visible");
    }
  }
  
  @Test
  @JavascriptEnabled
  @Ignore({ANDROID, CHROME, HTMLUNIT, IPHONE, SELENESE, OPERA})
  // OPERA: Does not support alerts yet
  public void testShouldImplicitlyWaitForAnAlert() {
    driver.get(pages.alertsPage);

    WebElement element = driver.findElement(By.id("slow-alert"));
    driver.manage().timeouts().implicitlyWait(2000, MILLISECONDS);

    element.click();
    try {
       driver.switchTo().alert().accept();
     } catch (NoAlertPresentException e) {
      fail("No implicit wait for an alert");
    }
  }

  @Test
  @JavascriptEnabled
  @Ignore({ANDROID, CHROME, HTMLUNIT, IPHONE, SELENESE, OPERA})
  // OPERA: Does not support alerts yet
  public void testShouldCheckAlertImmediatelyIfNoImplicitWaitSpecified() {
    driver.get(pages.alertsPage);

    WebElement element = driver.findElement(By.id("slow-alert"));

    element.click();
    try {
      driver.switchTo().alert().accept();
      fail("Alert should not be found");
    } catch (NoAlertPresentException expected) {
    }

    driver.manage().timeouts().implicitlyWait(2000, MILLISECONDS);
    driver.switchTo().alert().accept();
  }
}
