// This file was autogenerated by calcdeps.py
goog.addDependency("../../../javascript/webdriver-bootstrap.js", [], []);
goog.addDependency("../../../javascript/atoms/action.js", ['bot.action'], ['bot', 'bot.Error', 'bot.ErrorCode', 'bot.Keyboard', 'bot.Mouse', 'bot.dom', 'bot.events', 'bot.locators', 'goog.array', 'goog.dom', 'goog.dom.NodeType', 'goog.dom.TagName', 'goog.events.EventType', 'goog.math.Coordinate', 'goog.userAgent']);
goog.addDependency("../../../javascript/atoms/bot.js", ['bot'], ['goog.userAgent']);
goog.addDependency("../../../javascript/atoms/dom.js", ['bot.dom'], ['bot', 'bot.locators.xpath', 'goog.array', 'goog.dom', 'goog.dom.NodeIterator', 'goog.dom.NodeType', 'goog.dom.TagName', 'goog.math.Coordinate', 'goog.math.Rect', 'goog.math.Size', 'goog.string', 'goog.style']);
goog.addDependency("../../../javascript/atoms/error.js", ['bot.Error', 'bot.ErrorCode'], ['goog.debug.Error', 'goog.object']);
goog.addDependency("../../../javascript/atoms/events.js", ['bot.events'], ['bot.Error', 'bot.ErrorCode', 'goog.dom', 'goog.events.EventType', 'goog.userAgent']);
goog.addDependency("../../../javascript/atoms/frame.js", ['bot.frame'], ['bot.locators', 'goog.array', 'goog.dom']);
goog.addDependency("../../../javascript/atoms/inject.js", ['bot.inject', 'bot.inject.cache'], ['bot', 'bot.Error', 'bot.ErrorCode', 'goog.array', 'goog.dom', 'goog.dom.NodeType', 'goog.events', 'goog.json', 'goog.object']);
goog.addDependency("../../../javascript/atoms/keyboard.js", ['bot.Keyboard', 'bot.Keyboard.Key', 'bot.Keyboard.Keys'], ['bot.Error', 'bot.ErrorCode', 'bot.dom', 'bot.events', 'goog.array', 'goog.dom.selection', 'goog.events.EventType', 'goog.events.KeyCodes', 'goog.structs.Set', 'goog.userAgent']);
goog.addDependency("../../../javascript/atoms/mouse.js", ['bot.Mouse', 'bot.Mouse.Button'], ['bot', 'bot.Error', 'bot.ErrorCode', 'bot.dom', 'bot.events', 'bot.userAgent', 'goog.dom', 'goog.dom.Range', 'goog.dom.TagName', 'goog.events.EventType', 'goog.math.Coordinate', 'goog.style', 'goog.userAgent']);
goog.addDependency("../../../javascript/atoms/script.js", ['bot.script'], ['bot.Error', 'bot.ErrorCode', 'goog.events', 'goog.events.EventType']);
goog.addDependency("../../../javascript/atoms/userAgent.js", ['bot.userAgent'], ['goog.userAgent', 'goog.userAgent.product.isVersion']);
goog.addDependency("../../../javascript/atoms/window.js", ['bot.window'], ['bot', 'bot.Error', 'bot.ErrorCode', 'goog.userAgent']);
goog.addDependency("../../../javascript/atoms/html5/appcache.js", ['bot.appcache'], ['bot', 'bot.Error', 'bot.ErrorCode', 'bot.html5']);
goog.addDependency("../../../javascript/atoms/html5/connection.js", ['bot.connection'], ['bot', 'bot.Error', 'bot.ErrorCode', 'bot.html5']);
goog.addDependency("../../../javascript/atoms/html5/database.js", ['bot.storage.database'], ['bot', 'bot.Error', 'bot.ErrorCode', 'bot.html5']);
goog.addDependency("../../../javascript/atoms/html5/html5_browser.js", ['bot.html5'], ['bot', 'bot.Error', 'bot.ErrorCode']);
goog.addDependency("../../../javascript/atoms/html5/location.js", ['bot.geolocation'], ['bot', 'bot.html5']);
goog.addDependency("../../../javascript/atoms/html5/storage.js", ['bot.storage'], ['bot', 'bot.Error', 'bot.ErrorCode', 'bot.html5']);
goog.addDependency("../../../javascript/atoms/locators/classname.js", ['bot.locators.className'], ['goog.array', 'goog.dom', 'goog.dom.DomHelper', 'goog.string']);
goog.addDependency("../../../javascript/atoms/locators/css.js", ['bot.locators.css'], ['goog.array', 'goog.dom', 'goog.dom.NodeType', 'goog.object', 'goog.string', 'goog.userAgent']);
goog.addDependency("../../../javascript/atoms/locators/id.js", ['bot.locators.id'], ['bot.dom', 'goog.array', 'goog.dom']);
goog.addDependency("../../../javascript/atoms/locators/link_text.js", ['bot.locators.linkText', 'bot.locators.partialLinkText'], ['bot', 'bot.dom', 'goog.array', 'goog.dom', 'goog.dom.DomHelper']);
goog.addDependency("../../../javascript/atoms/locators/locators.js", ['bot.locators'], ['bot', 'bot.locators.className', 'bot.locators.css', 'bot.locators.id', 'bot.locators.linkText', 'bot.locators.name', 'bot.locators.partialLinkText', 'bot.locators.tagName', 'bot.locators.xpath', 'goog.array', 'goog.object']);
goog.addDependency("../../../javascript/atoms/locators/name.js", ['bot.locators.name'], ['bot.dom', 'goog.array', 'goog.dom']);
goog.addDependency("../../../javascript/atoms/locators/tag_name.js", ['bot.locators.tagName'], ['goog.array']);
goog.addDependency("../../../javascript/atoms/locators/xpath.js", ['bot.locators.xpath'], ['bot', 'goog.array', 'goog.dom', 'goog.dom.NodeType']);
goog.addDependency("../../../javascript/atoms/test/test_bootstrap.js", [], []);
goog.addDependency("../../../javascript/atoms/test/text_util.js", [], ['bot.dom', 'goog.array', 'goog.dom', 'goog.testing.TestCase']);
goog.addDependency("../../../javascript/atoms/test/window_focus.js", [], []);
goog.addDependency("../../../javascript/chrome-driver/atoms.js", ['webdriver.chrome'], ['goog.dom', 'goog.math.Coordinate', 'goog.math.Rect', 'goog.math.Size', 'goog.style']);
goog.addDependency("../../../javascript/firefox-driver/extension/components/badCertListener.js", [], []);
goog.addDependency("../../../javascript/firefox-driver/extension/components/dispatcher.js", [], []);
goog.addDependency("../../../javascript/firefox-driver/extension/components/driver-component.js", [], []);
goog.addDependency("../../../javascript/firefox-driver/extension/components/firefoxDriver.js", [], []);
goog.addDependency("../../../javascript/firefox-driver/extension/components/httpd.js", [], []);
goog.addDependency("../../../javascript/firefox-driver/extension/components/json2.js", [], []);
goog.addDependency("../../../javascript/firefox-driver/extension/components/nsCommandProcessor.js", [], []);
goog.addDependency("../../../javascript/firefox-driver/extension/components/promptService.js", [], []);
goog.addDependency("../../../javascript/firefox-driver/extension/components/request.js", [], []);
goog.addDependency("../../../javascript/firefox-driver/extension/components/response.js", [], []);
goog.addDependency("../../../javascript/firefox-driver/extension/components/screenshooter.js", [], []);
goog.addDependency("../../../javascript/firefox-driver/extension/components/session.js", [], []);
goog.addDependency("../../../javascript/firefox-driver/extension/components/sessionstore.js", [], []);
goog.addDependency("../../../javascript/firefox-driver/extension/components/socketListener.js", [], []);
goog.addDependency("../../../javascript/firefox-driver/extension/components/syntheticMouse.js", [], []);
goog.addDependency("../../../javascript/firefox-driver/extension/components/webdriverserver.js", [], []);
goog.addDependency("../../../javascript/firefox-driver/extension/components/webLoadingListener.js", [], []);
goog.addDependency("../../../javascript/firefox-driver/extension/components/wrappedElement.js", [], []);
goog.addDependency("../../../javascript/firefox-driver/extension/content/server.js", [], []);
goog.addDependency("../../../javascript/firefox-driver/js/errorcode.js", ['ErrorCode'], []);
goog.addDependency("../../../javascript/firefox-driver/js/evaluate.js", [], []);
goog.addDependency("../../../javascript/firefox-driver/js/events.js", ['webdriver.firefox.events'], ['Logger', 'Utils', 'goog.style', 'webdriver.firefox.utils']);
goog.addDependency("../../../javascript/firefox-driver/js/exported_symbols.js", [], ['webdriver.firefox.events']);
goog.addDependency("../../../javascript/firefox-driver/js/firefox-utils.js", ['webdriver.firefox.utils'], ['bot.userAgent', 'bot.Error', 'bot.ErrorCode', 'goog.array', 'Logger']);
goog.addDependency("../../../javascript/firefox-driver/js/locators.js", ['webdriver.firefox.locators'], ['bot.locators', 'bot.userAgent', 'goog.dom', 'webdriver.firefox.utils']);
goog.addDependency("../../../javascript/firefox-driver/js/logging.js", ['Logger', 'webdriver.debug', 'webdriver.debug.ConsoleFormatter'], ['goog.debug.Formatter', 'goog.debug.Logger', 'goog.debug.LogRecord', 'goog.debug.TextFormatter']);
goog.addDependency("../../../javascript/firefox-driver/js/modals.js", ['webdriver.modals'], ['ErrorCode', 'Logger', 'Timer', 'webdriver.firefox.utils']);
goog.addDependency("../../../javascript/firefox-driver/js/preconditions.js", ['webdriver.preconditions'], ['bot.dom', 'Utils']);
goog.addDependency("../../../javascript/firefox-driver/js/timer.js", ['Timer'], []);
goog.addDependency("../../../javascript/firefox-driver/js/utils.js", ['Utils'], ['bot.dom', 'bot.userAgent', 'goog.dom.TagName', 'goog.style', 'ErrorCode', 'Logger']);
goog.addDependency("../../../javascript/firefox-driver/js/utils_exports.js", [], []);
goog.addDependency("../../../javascript/iphone-driver/script.js", ['webdriver.iphone'], ['bot.inject']);
goog.addDependency("../../../javascript/jsunit/app/jsUnitCore.js", [], []);
goog.addDependency("../../../javascript/jsunit/app/jsUnitMockTimeout.js", [], []);
goog.addDependency("../../../javascript/jsunit/app/jsUnitTestManager.js", [], []);
goog.addDependency("../../../javascript/jsunit/app/jsUnitTestSuite.js", [], []);
goog.addDependency("../../../javascript/jsunit/app/jsUnitTracer.js", [], []);
goog.addDependency("../../../javascript/jsunit/app/jsUnitVersionCheck.js", [], []);
goog.addDependency("../../../javascript/jsunit/app/xbDebug.js", [], []);
goog.addDependency("../../../javascript/selenium-atoms/browserbot.js", ['core.browserbot'], ['bot.locators', 'bot.dom', 'core.locators', 'core.patternMatcher']);
goog.addDependency("../../../javascript/selenium-atoms/core.js", ['core.Error'], []);
goog.addDependency("../../../javascript/selenium-atoms/events.js", ['core.events'], ['bot.dom', 'bot.events', 'core.Error', 'core.locators', 'goog.dom.TagName']);
goog.addDependency("../../../javascript/selenium-atoms/filters.js", ['core.filters'], ['bot.dom', 'core.Error', 'goog.array']);
goog.addDependency("../../../javascript/selenium-atoms/firefox-chrome.js", ['core.firefox'], []);
goog.addDependency("../../../javascript/selenium-atoms/locator_strategies.js", ['core.LocatorStrategies'], ['bot.inject.cache', 'bot.locators', 'core.Error', 'core.filters', 'goog.string']);
goog.addDependency("../../../javascript/selenium-atoms/pattern_matcher.js", ['core.patternMatcher'], []);
goog.addDependency("../../../javascript/selenium-atoms/script.js", ['core.script'], ['bot.script']);
goog.addDependency("../../../javascript/selenium-atoms/se_element.js", ['core.element'], ['bot.dom', 'core.Error', 'core.locators']);
goog.addDependency("../../../javascript/selenium-atoms/se_locators.js", ['core.locators', 'core.locators.Locator'], ['core.Error', 'core.LocatorStrategies', 'goog.dom.NodeType', 'goog.string']);
goog.addDependency("../../../javascript/selenium-atoms/select.js", ['core.select', 'core.select.option'], ['bot.action', 'core.Error', 'core.locators', 'core.patternMatcher']);
goog.addDependency("../../../javascript/selenium-atoms/testbase.js", [], []);
goog.addDependency("../../../javascript/selenium-atoms/text.js", ['core.text'], ['bot.dom', 'core.locators', 'core.patternMatcher', 'goog.dom', 'goog.dom.NodeType', 'goog.string', 'goog.userAgent']);
goog.addDependency("../../../javascript/selenium-core/lib/prototype.js", [], []);
goog.addDependency("../../../javascript/selenium-core/lib/snapsie.js", [], []);
goog.addDependency("../../../javascript/selenium-core/lib/cssQuery/cssQuery-p.js", [], []);
goog.addDependency("../../../javascript/selenium-core/lib/cssQuery/src/cssQuery-level2.js", [], []);
goog.addDependency("../../../javascript/selenium-core/lib/cssQuery/src/cssQuery-level3.js", [], []);
goog.addDependency("../../../javascript/selenium-core/lib/cssQuery/src/cssQuery-standard.js", [], []);
goog.addDependency("../../../javascript/selenium-core/lib/cssQuery/src/cssQuery.js", [], []);
goog.addDependency("../../../javascript/selenium-core/lib/scriptaculous/builder.js", [], []);
goog.addDependency("../../../javascript/selenium-core/lib/scriptaculous/controls.js", [], []);
goog.addDependency("../../../javascript/selenium-core/lib/scriptaculous/dragdrop.js", [], []);
goog.addDependency("../../../javascript/selenium-core/lib/scriptaculous/effects.js", [], []);
goog.addDependency("../../../javascript/selenium-core/lib/scriptaculous/scriptaculous.js", [], []);
goog.addDependency("../../../javascript/selenium-core/lib/scriptaculous/slider.js", [], []);
goog.addDependency("../../../javascript/selenium-core/lib/scriptaculous/unittest.js", [], []);
goog.addDependency("../../../javascript/selenium-core/scripts/find_matching_child.js", [], []);
goog.addDependency("../../../javascript/selenium-core/scripts/htmlutils.js", [], []);
goog.addDependency("../../../javascript/selenium-core/scripts/selenium-api.js", [], []);
goog.addDependency("../../../javascript/selenium-core/scripts/selenium-browserbot.js", [], []);
goog.addDependency("../../../javascript/selenium-core/scripts/selenium-browserdetect.js", [], []);
goog.addDependency("../../../javascript/selenium-core/scripts/selenium-commandhandlers.js", [], []);
goog.addDependency("../../../javascript/selenium-core/scripts/selenium-executionloop.js", [], []);
goog.addDependency("../../../javascript/selenium-core/scripts/selenium-logging.js", [], []);
goog.addDependency("../../../javascript/selenium-core/scripts/selenium-remoterunner.js", [], []);
goog.addDependency("../../../javascript/selenium-core/scripts/selenium-testrunner.js", [], []);
goog.addDependency("../../../javascript/selenium-core/scripts/selenium-version.js", [], []);
goog.addDependency("../../../javascript/selenium-core/scripts/ui-element.js", [], []);
goog.addDependency("../../../javascript/selenium-core/scripts/ui-map-sample.js", [], []);
goog.addDependency("../../../javascript/selenium-core/scripts/user-extensions.js", [], []);
goog.addDependency("../../../javascript/selenium-core/scripts/xmlextras.js", [], []);
goog.addDependency("../../../javascript/selenium-core/test/AlertHandlingTest.js", [], []);
goog.addDependency("../../../javascript/selenium-core/test/AssertTest.js", [], []);
goog.addDependency("../../../javascript/selenium-core/test/BrowserBotFrameFinderTest.js", [], []);
goog.addDependency("../../../javascript/selenium-core/test/BrowserBotTest.js", [], []);
goog.addDependency("../../../javascript/selenium-core/test/CommandFactoryTest.js", [], []);
goog.addDependency("../../../javascript/selenium-core/test/CommandHandlerTest.js", [], []);
goog.addDependency("../../../javascript/selenium-core/test/ConfirmHandlingTest.js", [], []);
goog.addDependency("../../../javascript/selenium-core/test/CookieTest.js", [], []);
goog.addDependency("../../../javascript/selenium-core/test/ErrorCheckingCommandTest.js", [], []);
goog.addDependency("../../../javascript/selenium-core/test/HtmlUtilTest.js", [], []);
goog.addDependency("../../../javascript/selenium-core/test/OptionLocatorTest.js", [], []);
goog.addDependency("../../../javascript/selenium-core/test/PageBotAccessorTest.js", [], []);
goog.addDependency("../../../javascript/selenium-core/test/PatternMatcherTest.js", [], []);
goog.addDependency("../../../javascript/selenium-core/test/RemoteRunnerTest.js", [], []);
goog.addDependency("../../../javascript/selenium-core/test/SampleTest.js", [], []);
goog.addDependency("../../../javascript/selenium-core/test/SeleniumApiTest.js", [], []);
goog.addDependency("../../../javascript/selenium-core/test/SeleniumParameterTest.js", [], []);
goog.addDependency("../../../javascript/selenium-core/test/TestLoopHandleErrorTest.js", [], []);
goog.addDependency("../../../javascript/selenium-core/test/UIElementTest.js", [], []);
goog.addDependency("../../../javascript/selenium-core/xpath/dom.js", [], []);
goog.addDependency("../../../javascript/selenium-core/xpath/javascript-xpath-0.1.11.js", [], []);
goog.addDependency("../../../javascript/selenium-core/xpath/util.js", [], []);
goog.addDependency("../../../javascript/selenium-core/xpath/xmltoken.js", [], []);
goog.addDependency("../../../javascript/selenium-core/xpath/xpath.js", [], []);
goog.addDependency("../../../javascript/shared-extension/src/dommessenger.js", [], []);
goog.addDependency("../../../javascript/watir-atoms/watir.js", ['watir'], ['goog.dom.Range', 'goog.iter', 'goog.array']);
goog.addDependency("../../../javascript/webdriver-atoms/interactions.js", ['webdriver.interactions'], ['bot.action']);
goog.addDependency("../../../javascript/webdriver-atoms/web_element.js", ['webdriver.element'], ['bot.dom', 'goog.dom', 'goog.dom.TagName', 'goog.math', 'goog.string', 'goog.style']);
goog.addDependency("../../../javascript/webdriver-atoms/html5/local_storage.js", ['webdriver.storage.local'], ['bot.storage']);
goog.addDependency("../../../javascript/webdriver-atoms/html5/session_storage.js", ['webdriver.storage.session'], ['bot.storage']);
goog.addDependency("../../../javascript/webdriver-atoms/inject/action.js", ['webdriver.inject.action'], ['bot.action', 'bot.inject']);
goog.addDependency("../../../javascript/webdriver-atoms/inject/dom.js", ['webdriver.inject.dom'], ['bot.action', 'bot.dom', 'bot.inject', 'webdriver.element']);
goog.addDependency("../../../javascript/webdriver-atoms/inject/execute_script.js", ['webdriver.inject'], ['bot.inject', 'bot.inject.cache']);
goog.addDependency("../../../javascript/webdriver-atoms/inject/find_element.js", ['webdriver.inject.locators'], ['bot.inject', 'bot.locators']);
goog.addDependency("../../../javascript/webdriver-atoms/inject/frame.js", ['webdriver.inject.frame'], ['bot.frame', 'bot.inject', 'bot.inject.cache']);
goog.addDependency("../../../javascript/webdriver-jsapi/src/abstractcommandprocessor.js", ['webdriver.AbstractCommandProcessor'], ['goog.Disposable', 'goog.array', 'goog.object', 'webdriver.CommandName', 'webdriver.Future', 'webdriver.Response', 'webdriver.Response.Code', 'webdriver.WebElement', 'webdriver.timing']);
goog.addDependency("../../../javascript/webdriver-jsapi/src/asserts.js", ['webdriver.asserts'], ['goog.math.Coordinate', 'goog.string', 'webdriver.Future']);
goog.addDependency("../../../javascript/webdriver-jsapi/src/by.js", ['webdriver.By', 'webdriver.By.Locator', 'webdriver.By.Strategy'], ['goog.object', 'goog.string']);
goog.addDependency("../../../javascript/webdriver-jsapi/src/command.js", ['webdriver.Command', 'webdriver.CommandName', 'webdriver.Response', 'webdriver.Response.Code'], ['goog.array', 'goog.events.EventTarget', 'goog.testing.stacktrace', 'webdriver.Future']);
goog.addDependency("../../../javascript/webdriver-jsapi/src/factory.js", ['webdriver.factory'], ['goog.userAgent', 'webdriver.LocalCommandProcessor', 'webdriver.WebDriver']);
goog.addDependency("../../../javascript/webdriver-jsapi/src/future.js", ['webdriver.Future'], ['goog.Disposable', 'goog.array']);
goog.addDependency("../../../javascript/webdriver-jsapi/src/jsunit.js", ['webdriver.jsunit'], ['goog.testing.jsunit', 'webdriver.TestCase', 'webdriver.asserts', 'webdriver.factory']);
goog.addDependency("../../../javascript/webdriver-jsapi/src/key.js", ['webdriver.Key'], ['goog.array']);
goog.addDependency("../../../javascript/webdriver-jsapi/src/localcommandprocessor.js", ['webdriver.LocalCommandProcessor'], ['goog.array', 'goog.debug.Logger', 'goog.dom', 'goog.events', 'goog.json', 'goog.object', 'webdriver.AbstractCommandProcessor', 'webdriver.CommandName', 'webdriver.Response']);
goog.addDependency("../../../javascript/webdriver-jsapi/src/testcase.js", ['webdriver.TestCase', 'webdriver.TestCase.Test'], ['goog.events', 'goog.testing.TestCase', 'goog.testing.TestCase.Test', 'goog.testing.asserts', 'webdriver.Command']);
goog.addDependency("../../../javascript/webdriver-jsapi/src/timing.js", ['webdriver.timing'], ['goog.userAgent']);
goog.addDependency("../../../javascript/webdriver-jsapi/src/webdriver.js", ['webdriver.WebDriver', 'webdriver.WebDriver.EventType', 'webdriver.WebDriver.Speed'], ['goog.debug.Logger', 'goog.events', 'goog.events.EventTarget', 'webdriver.By.Locator', 'webdriver.Command', 'webdriver.CommandName', 'webdriver.Response', 'webdriver.WebElement', 'webdriver.timing']);
goog.addDependency("../../../javascript/webdriver-jsapi/src/webelement.js", ['webdriver.WebElement'], ['goog.array', 'webdriver.By.Locator', 'webdriver.By.Strategy', 'webdriver.CommandName', 'webdriver.Future']);
goog.addDependency("../../../javascript/webdriver-jsapi/test/deps.js", [], []);
goog.addDependency("../../../javascript/webdriver-jsapi/test/fakecommandprocessor.js", ['webdriver.FakeCommandProcessor'], ['goog.structs.Map', 'goog.testing.asserts', 'webdriver.AbstractCommandProcessor']);
goog.addDependency("../../../javascript/webdriver-jsapi/test/testbase.js", [], ['goog.Uri', 'goog.dom', 'goog.events', 'goog.math.Coordinate', 'goog.math.Size', 'goog.string', 'goog.userAgent', 'webdriver.Key', 'webdriver.WebElement', 'webdriver.asserts', 'webdriver.factory', 'webdriver.jsunit']);
goog.addDependency("../../../javascript/webdriver-jsapi/test/webdriver-bootstrap.js", [], []);
