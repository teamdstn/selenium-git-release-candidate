// Copyright 2011 Software Freedom Conservatory. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview The heart of the WebDriver JavaScript API.
 */

goog.provide('webdriver.Key');
goog.provide('webdriver.WebDriver');
goog.provide('webdriver.WebDriver.Navigation');
goog.provide('webdriver.WebDriver.Options');
goog.provide('webdriver.WebDriver.TargetLocator');
goog.provide('webdriver.WebDriver.Timeouts');
goog.provide('webdriver.WebElement');

goog.require('bot.Error');
goog.require('bot.ErrorCode');
goog.require('goog.array');
goog.require('goog.object');
goog.require('webdriver.Command');
goog.require('webdriver.CommandName');
goog.require('webdriver.Locator');
goog.require('webdriver.Session');
goog.require('webdriver.error');
goog.require('webdriver.promise');
goog.require('webdriver.promise.Application');
goog.require('webdriver.promise.Deferred');
goog.require('webdriver.promise.Promise');


//////////////////////////////////////////////////////////////////////////////
//
//  webdriver.WebDriver
//
//////////////////////////////////////////////////////////////////////////////

/**
 * Creates a new WebDriver client, which provides control over a browser.
 *
 * Every WebDriver command returns a {@code webdriver.promise.Promise} that
 * represents the result of that command. Callbacks may be registered on this
 * object to manipulate the command result or catch an expected error. Any
 * commands scheduled with a callback are considered sub-commands and will
 * execute before the next command in the current frame. For example:
 *
 *   var message = [];
 *   driver.call(message.push, message, 'a').then(function() {
 *     driver.call(message.push, message, 'b');
 *   });
 *   driver.call(message.push, message, 'c');
 *   driver.call(function() {
 *     alert('message is abc? ' + (message.join('') == 'abc'));
 *   });
 *
 * @param {!(webdriver.Session|webdriver.promise.Promise)} session Either a
 *     known session or a promise that will be resolved to a session.
 * @param {!webdriver.CommandExecutor} executor The executor to use when
 *     sending commands to the browser.
 * @constructor
 */
webdriver.WebDriver = function(session, executor) {

  /**
   * The browser session this driver is controlling.
   * @type {!(webdriver.Session|webdriver.promise.Promise)}
   * @private
   */
  this.session_ = session;

  /**
   * Object used to execute individual commands.
   * @type {!webdriver.CommandExecutor}
   * @private
   */
  this.executor_ = executor;
};


/**
 * Converts an object to its JSON representation in the WebDriver wire protocol.
 * When converting values of type object, the following steps will be taken:
 * <ol>
 * <li>if the object provides a "toWireValue" function, the return value will
 *     be returned in its fully resolved state (e.g. this function may return
 *     promise values)</li>
 * <li>if the object provides a "toJSON" function, the return value of this
 *     function will be returned</li>
 * <li>otherwise, the value of each key will be recursively converted according
 *     to the rules above.</li>
 * </ol>
 *
 * @param {*} obj The object to convert.
 * @return {!webdriver.promise.Promise} A promise that will resolve to the
 *     input value's JSON representation.
 * @private
 * @see http://code.google.com/p/selenium/wiki/JsonWireProtocol
 */
webdriver.WebDriver.toWireValue_ = function(obj) {
  switch (goog.typeOf(obj)) {
    case 'array':
      return webdriver.promise.fullyResolved(
          goog.array.map(obj, webdriver.WebDriver.toWireValue_));
    case 'object':
      if (goog.isFunction(obj.toWireValue)) {
        return webdriver.promise.fullyResolved(obj.toWireValue());
      }
      if (goog.isFunction(obj.toJSON)) {
        return webdriver.promise.resolved(obj.toJSON());
      }
      return webdriver.promise.fullyResolved(
          goog.object.map(obj, webdriver.WebDriver.toWireValue_));
    case 'function':
      return webdriver.promise.resolved('' + obj);
    case 'undefined':
      return webdriver.promise.resolved(null);
    default:
      return webdriver.promise.resolved(obj);
  }
};


/**
 * Converts a value from its JSON representation according to the WebDriver wire
 * protocol. Any JSON object containing a
 * {@code webdriver.WebElement.ELEMENT_KEY} key will be decoded to a
 * {@code webdriver.WebElement} object. All other values will be passed through
 * as is.
 * @param {!webdriver.WebDriver} driver The driver instance to use as the
 *     parent of any unwrapped {@code webdriver.WebElement} values.
 * @param {*} value The value to convert.
 * @return {*} The converted value.
 * @see http://code.google.com/p/selenium/wiki/JsonWireProtocol
 */
webdriver.WebDriver.fromWireValue_ = function(driver, value) {
  if (goog.isArray(value)) {
    value = goog.array.map((/**@type {goog.array.ArrayLike}*/value),
        goog.partial(webdriver.WebDriver.fromWireValue_, driver));
  } else if (value && goog.isObject(value)) {
    if (webdriver.WebElement.ELEMENT_KEY in value) {
      value = new webdriver.WebElement(driver,
          value[webdriver.WebElement.ELEMENT_KEY]);
    } else {
      value = goog.object.map((/**@type {!Object}*/value),
          goog.partial(webdriver.WebDriver.fromWireValue_, driver));
    }
  }
  return value;
};


/**
 * Schedules a {@code webdriver.Command} to be executed by this driver's
 * {@code webdriver.CommandExecutor}.
 * @param {!webdriver.Command} command The command to schedule.
 * @param {string} description A description of the command for debugging.
 * @return {!webdriver.promise.Promise} A promise that will be resolved with
 *     the command result.
 */
webdriver.WebDriver.prototype.schedule = function(command, description) {
  var self = this;

  checkHasNotQuit();
  command.setParameter('sessionId', this.session_);

  var app = webdriver.promise.Application.getInstance();
  return app.schedule(description, function() {
    // A call to WebDriver.quit() may have been scheduled in the same event
    // loop as this |command|, which would prevent us from detecting that the
    // driver has quit above.  Therefore, we need to make another quick check.
    // We still check above so we can fail as early as possible.
    checkHasNotQuit();

    return webdriver.promise.fullyResolved(command.getParameters()).
        then(webdriver.WebDriver.toWireValue_).
        then(function(parameters) {
          command.setParameters(parameters);
          return webdriver.promise.checkedNodeCall(
              goog.bind(self.executor_.execute, self.executor_, command));
        });
      }).
      then(function(response) {
        webdriver.error.checkResponse(response);
        return webdriver.WebDriver.fromWireValue_(self, response['value']);
      });

  function checkHasNotQuit() {
    if (!self.session_) {
      throw new Error('This driver instance does not have a valid session ID ' +
                      '(did you call WebDriver.quit()?) and may no longer be ' +
                      'used.');
    }
  }
};


// ----------------------------------------------------------------------------
// Client command functions:
// ----------------------------------------------------------------------------


/**
 * @return {!webdriver.promise.Promise} A promise for this client's session.
 * @export
 */
webdriver.WebDriver.prototype.getSession = function() {
  return webdriver.promise.when(this.session_);
};


/**
 * Returns a promise for one of this driver's capabilities.
 * @param {string} name The name of the capability to query.
 * @return {!webdriver.promise.Promise} A promise that will resolve with the
 *     given capability once its value is ready.
 * @export
 */
webdriver.WebDriver.prototype.getCapability = function(name) {
  return webdriver.promise.when(this.session_, function(session) {
    return session.capabilities[name];
  });
};


/**
 * Schedules a command to quit the current session. After calling quit, this
 * instance will be invalidated and may no longer be used to issue commands
 * against the browser.
 * @export
 */
webdriver.WebDriver.prototype.quit = function() {
  var result = this.schedule(
      new webdriver.Command(webdriver.CommandName.QUIT),
      'WebDriver.quit()');
  // Delete our session ID when the quit command finishes; this will allow us to
  // throw an error when attemnpting to use a driver post-quit.
  result.addBoth(function() {
    delete this.session_;
  }, this);
};


/**
 * Schedules a command to execute JavaScript in the context of the currently
 * selected frame or window. The script fragment will be executed as the body
 * of an anonymous function. If the script is provided as a function object,
 * that function will be converted to a string for injection into the target
 * window.
 *
 * Any arguments provided in addition to the script will be included as script
 * arguments and may be referenced using the {@code arguments} object.
 * Arguments may be a boolean, number, string, or {@code webdriver.WebElement}.
 * Arrays and objects may also be used as script arguments as long as each item
 * adheres to the types previously mentioned.
 *
 * The script may refer to any variables accessible from the current window.
 * Furthermore, the script will execute in the window's context, thus
 * {@code document} may be used to refer to the current document. Any local
 * variables will not be available once the script has finished executing,
 * though global variables will persist.
 *
 * If the script has a return value (i.e. if the script contains a return
 * statement), then the following steps will be taken for resolving this
 * functions return value:
 * <ul>
 * <li>For a HTML element, the value will resolve to a
 *     {@code webdriver.WebElement}</li>
 * <li>Null and undefined return values will resolve to null</li>
 * <li>Booleans, numbers, and strings will resolve as is</li>
 * <li>Functions will resolve to their string representation</li>
 * <li>For arrays and objects, each member item will be converted according to
 *     the rules above</li>
 * </ul>
 *
 * @param {!(string|Function)} script The script to execute.
 * @param {...*} var_args The arguments to pass to the script.
 * @return {!webdriver.promise.Promise} A promise that will resolve to the
 *    scripts return value.
 * @export
 */
 webdriver.WebDriver.prototype.executeScript = function(script, var_args) {
  if (goog.isFunction(script)) {
    script = 'return (' + script + ').apply(null, arguments);';
  }
  return this.schedule(
      new webdriver.Command(webdriver.CommandName.EXECUTE_SCRIPT).
          setParameter('script', script).
          setParameter('args', goog.array.slice(arguments, 1)),
      'WebDriver.executeScript()');
};


/**
 * Schedules a command to execute asynchronous JavaScript in the context of the
 * currently selected frame or window. The script fragment will be executed as
 * the body of an anonymous function. If the script is provided as a function
 * object, that function will be converted to a string for injection into the
 * target window.
 *
 * Any arguments provided in addition to the script will be included as script
 * arguments and may be referenced using the {@code arguments} object.
 * Arguments may be a boolean, number, string, or {@code webdriver.WebElement}.
 * Arrays and objects may also be used as script arguments as long as each item
 * adheres to the types previously mentioned.
 *
 * Unlike executing synchronous JavaScript with
 * {@code webdriver.WebDriver.prototype.executeScript}, scripts executed with
 * this function must explicitly signal they are finished by invoking the
 * provided callback. This callback will always be injected into the
 * executed function as the last argument, and thus may be referenced with
 * {@code arguments[arguments.length - 1]}. The following steps will be taken
 * for resolving this functions return value against the first argument to the
 * script's callback function:
 * <ul>
 * <li>For a HTML element, the value will resolve to a
 *     {@code webdriver.WebElement}</li>
 * <li>Null and undefined return values will resolve to null</li>
 * <li>Booleans, numbers, and strings will resolve as is</li>
 * <li>Functions will resolve to their string representation</li>
 * <li>For arrays and objects, each member item will be converted according to
 *     the rules above</li>
 * </ul>
 *
 * Example #1: Performing a sleep that is synchronized with the currently
 * selected window:
 * <code><pre>
 * var start = new Date().getTime();
 * driver.executeAsyncScript(
 *     'window.setTimeout(arguments[arguments.length - 1], 500);').
 *     then(function() {
 *       console.log('Elapsed time: ' + (new Date().getTime() - start) + ' ms');
 *     });
 * </pre></code>
 *
 * Example #2: Synchronizing a test with an AJAX application:
 * <code><pre>
 * var button = driver.findElement(By.id('compose-button'));
 * button.click();
 * driver.executeAsyncScript(
 *     'var callback = arguments[arguments.length - 1];' +
 *     'mailClient.getComposeWindowWidget().onload(callback);');
 * driver.switchTo().frame('composeWidget');
 * driver.findElement(By.id('to')).sendKEys('dog@example.com');
 * </pre></code>
 *
 * Example #3: Injecting a XMLHttpRequest and waiting for the result. In this
 * example, the inject script is specified with a function literal. When using
 * this format, the function is converted to a string for injection, so it
 * should not reference any symbols not defined in the scope of the page under
 * test.
 * <code><pre>
 * driver.executeAsyncScript(function() {
 *   var callback = arguments[arguments.length - 1];
 *   var xhr = new XMLHttpRequest();
 *   xhr.open("GET", "/resource/data.json", true);
 *   xhr.onreadystatechange = function() {
 *     if (xhr.readyState == 4) {
 *       callback(xhr.resposneText);
 *     }
 *   }
 *   xhr.send('');
 * }).then(function(str) {
 *   console.log(JSON.parse(str)['food']);
 * });
 * </pre></code>
 *
 * @param {!(string|Function)} script The script to execute.
 * @param {...*} var_args The arguments to pass to the script.
 * @return {!webdriver.promise.Promise} A promise that will resolve to the
 *    scripts return value.
 * @export
 */
webdriver.WebDriver.prototype.executeAsyncScript = function(script, var_args) {
  if (goog.isFunction(script)) {
    script = 'return (' + script + ').apply(null, arguments);';
  }
  return this.schedule(
      new webdriver.Command(webdriver.CommandName.EXECUTE_ASYNC_SCRIPT).
          setParameter('script', script).
          setParameter('args', goog.array.slice(arguments, 1)),
      'WebDriver.executeScript()');
};


/**
 * Schedules a command to execute a custom function.
 * @param {!Function} fn The function to execute.
 * @param {Object=} opt_scope The object in whose scope to execute the function.
 * @param {...*} var_args Any arguments to pass to the function.
 * @return {!webdriver.promise.Promise} A promise that will be resolved with the
 *     function's result.
 * @export
 */
webdriver.WebDriver.prototype.call = function(fn, opt_scope, var_args) {
  var args = goog.array.slice(arguments, 2);
  var app = webdriver.promise.Application.getInstance();
  return app.schedule('WebDriver.call(' + (fn.name || 'function') + ')',
      function() {
        return webdriver.promise.fullyResolved(args).then(function(args) {
          return fn.apply(opt_scope, args);
        });
      });
};


/**
 * Schedules a command to wait for a condition to hold, as defined by some
 * user supplied function. If any errors occur while evaluating the wait, they
 * will be allowed to propagate.
 * @param {function():boolean} fn The function to evaluate as a wait condition.
 * @param {number} timeout How long to wait for the condition to be true.
 * @param {Object} opt_scope The object in whose scope to evaluate the wait.
 * @param {string} opt_message An optional message to use if the wait times out.
 * @param {boolean} opt_waitNot Whether to wait for the inverse of the
 *     condition.
 * @return {!webdriver.promise.Promise} A promise that will be resolved when the
 *     wait condition has been satisfied.
 * @export
 */
webdriver.WebDriver.prototype.wait = function(fn, timeout, opt_scope,
                                              opt_message, opt_waitNot) {
  var fnName = fn.name || '<anonymous function>';
  var suffix = opt_message ? ' (' + opt_message + ')' : '';
  return webdriver.promise.Application.getInstance().scheduleWait(
      'WebDriver.wait(' + fnName + ')' + suffix,
      goog.bind(fn, opt_scope), timeout, opt_message, opt_waitNot);
};


/**
 * Schedules a command to wait for the inverse of a user specified condition.
 * @param {function():boolean} fn The function to evaluate as a wait condition.
 * @param {number} timeout How long to wait for the condition to be true.
 * @param {Object} opt_scope The object in whose scope to evaluate the wait.
 * @param {string} opt_message An optional message to use if the wait times out.
 * @return {!webdriver.promise.Promise} A promise that will be resolved when the
 *     wait condition has been satisfied.
 * @export
 */
webdriver.WebDriver.prototype.waitNot = function(fn, timeout, opt_scope,
                                                 opt_message) {
  return this.wait(fn, timeout, opt_scope, opt_message, true);
};


/**
 * Schedules a command to make the driver sleep for the given amount of time.
 * @param {number} ms The amount of time, in milliseconds, to sleep.
 * @return {!webdriver.promise.Promise} A promise that will be resolved when the
 *     sleep has finished.
 * @export
 */
webdriver.WebDriver.prototype.sleep = function(ms) {
  return webdriver.promise.Application.getInstance().
      scheduleTimeout('WebDriver.sleep(' + ms + ')', ms);
};


/**
 * Schedules a command to retrieve they current window handle.
 * @return {!webdriver.promise.Promise} A promise that will be resolved with the
 *     current window handle.
 * @export
 */
webdriver.WebDriver.prototype.getWindowHandle = function() {
  return this.schedule(
      new webdriver.Command(webdriver.CommandName.GET_CURRENT_WINDOW_HANDLE),
      'WebDriver.getWindowHandle()');
};


/**
 * Schedules a command to retrieve the current list of available window handles.
 * @return {!webdriver.promise.Promise} A promise that will be resolved with an
 *     array of window handles.
 * @export
 */
webdriver.WebDriver.prototype.getAllWindowHandles = function() {
  return this.schedule(
      new webdriver.Command(webdriver.CommandName.GET_WINDOW_HANDLES),
      'WebDriver.getAllWindowHandles()');
};


/**
 * Schedules a command to retrieve the current page's source. The page source
 * returned is a representation of the underlying DOM: do not expect it to be
 * formatted or escaped in the same way as the response sent from the web
 * server.
 * @return {!webdriver.promise.Promise} A promise that will be resolved with the
 *     current page source.
 * @export
 */
webdriver.WebDriver.prototype.getPageSource = function() {
  return this.schedule(
      new webdriver.Command(webdriver.CommandName.GET_PAGE_SOURCE),
      'WebDriver.getAllWindowHandles()');
};


/**
 * Schedules a command to close the current window.
 * @return {!webdriver.promise.Promise} A promise that will be resolved when
 *     this command has completed.
 * @export
 */
webdriver.WebDriver.prototype.close = function() {
  return this.schedule(new webdriver.Command(webdriver.CommandName.CLOSE),
                        'WebDriver.close()');
};


/**
 * Schedules a command to navigate to the given URL.
 * @param {string} url The fully qualified URL to open.
 * @return {!webdriver.promise.Promise} A promise that will be resolved when the
 *     document has finished loading.
 * @export
 */
webdriver.WebDriver.prototype.get = function(url) {
  return this.navigate().to(url);
};


/**
 * Schedules a command to retrieve the URL of the current page.
 * @return {!webdriver.promise.Promise} A promise that will be resolved with the
 *     current URL.
 * @export
 */
webdriver.WebDriver.prototype.getCurrentUrl = function() {
  return this.schedule(
      new webdriver.Command(webdriver.CommandName.GET_CURRENT_URL),
      'WebDriver.getCurrentUrl()');
};


/**
 * Schedules a command to retrieve the current page's title.
 * @return {!webdriver.promise.Promise} A promise that will be resolved with the
 *     current page's title.
 * @export
 */
webdriver.WebDriver.prototype.getTitle = function() {
  return this.schedule(new webdriver.Command(webdriver.CommandName.GET_TITLE),
                        'WebDriver.getTitle()');
};


/**
 * Schedule a command to find an element on the page. If the element cannot be
 * found, a {@code bot.ErrorCode.NO_SUCH_ELEMENT} result will be returned
 * by the driver. Unlike other commands, this error cannot be suppressed. In
 * other words, scheduling a command to find an element doubles as an assert
 * that the element is present on the page. To test whether an element is
 * present on the page, use {@code #isElementPresent} instead.
 *
 * <p>The search criteria for find an element may either be a
 * {@code webdriver.Locator} object, or a simple JSON object whose sole key
 * is one of the accepted locator strategies, as defined by
 * {@code webdriver.Locator.Strategy}. For example, the following two statements
 * are equivalent:
 * <code><pre>
 * var e1 = driver.findElement(By.id('foo'));
 * var e2 = driver.findElement({id:'foo'});
 * </pre></code>
 *
 * <p>When running in the browser, a WebDriver cannot manipulate DOM elements
 * directly; it may do so only through a {@link webdriver.WebElement} reference.
 * This function may be used to generate a WebElement from a DOM element. A
 * reference to the DOM element will be stored in a known location and this
 * driver will attempt to retrieve it through {@link #executeScript}. If the
 * element cannot be found (eg, it belongs to a different document than the
 * one this instance is currently focused on), a
 * {@link bot.ErrorCode.NO_SUCH_ELEMENT} error will be returned.
 *
 * @param {!(webdriver.Locator|Object.<string>|Element)} locatorOrElement The
 *     locator strategy to use when searching for the element, or the actual
 *     DOM element to be located by the server.
 * @param {...} var_args Arguments to pass to {@code #executeScript} if using a
 *     JavaScript locator.  Otherwise ignored.
 * @return {!webdriver.WebElement} A WebElement that can be used to issue
 *     commands against the located element. If the element is not found, the
 *     element will be invalidated and all scheduled commands aborted.
 * @export
 */
webdriver.WebDriver.prototype.findElement = function(locatorOrElement,
                                                     var_args) {
  var id;
  if (locatorOrElement.nodeType === 1 && locatorOrElement.ownerDocument) {
    id = this.findDomElement_(/** @typedef {!Element} */locatorOrElement).
        then(function(elements) {
          if (!elements.length) {
            throw new bot.Error(bot.ErrorCode.NO_SUCH_ELEMENT,
                'Unable to locate element. Is WebDriver focused on its ' +
                    'ownerDocument\'s frame?');
          }
          return elements[0];
        });
  } else {
    var locator = webdriver.Locator.checkLocator(locatorOrElement);
    if (locator.using == 'js') {
      var args = goog.array.slice(arguments, 1);
      goog.array.splice(args, 0, 0, locator.value);

      id = this.executeScript.apply(this, args).
          then(function(value) {
            if (!(value instanceof webdriver.WebElement)) {
              throw new Error('JS locator script result was not a WebElement');
            }
            return value;
          });
    } else {
      var command = new webdriver.Command(webdriver.CommandName.FIND_ELEMENT).
          setParameter('using', locator.using).
          setParameter('value', locator.value);
      id = this.schedule(command, 'WebDriver.findElement(' + locator + ')');
    }
  }
  return new webdriver.WebElement(this, id);
};


/**
 * Locates a DOM element so that commands may be issued against it using the
 * {@link webdriver.WebElement} class. This is accomplished by storing a
 * reference to the element in an object on the element's ownerDocument.
 * {@link #executeScript} will then be used to create a WebElement from this
 * reference. This requires this driver to currently be focused on the
 * ownerDocument's window+frame.

 * @param {!Element} element The element to locate.
 * @return {!webdriver.WebElement} A WebElement that can be used to issue
 *     commands against the provided DOM element.
 * @private
 */
webdriver.WebDriver.prototype.findDomElement_ = function(element) {
  var doc = element.ownerDocument;
  var store = doc['$webdriver$'] = doc['$webdriver$'] || {};
  var id = Math.floor(Math.random() * goog.now()).toString(36);
  store[id] = element;
  element[id] = id;

  function cleanUp() {
    delete store[id];
  }

  function lookupElement(id) {
    var store = document['$webdriver$'];
    if (!store) {
      return null;
    }

    var element = store[id];
    if (!element || element[id] !== id) {
      return [];
    }
    return [element];
  }

  return this.executeScript(lookupElement, id).
      then(function(value) {
        cleanUp();
        if (value.length && !(value[0] instanceof webdriver.WebElement)) {
          throw new Error('JS locator script result was not a WebElement');
        }
        return value;
      }, cleanUp);
};


/**
 * Schedules a command to test if an element is present on the page.
 *
 * <p>If given a DOM element, this function will check if it belongs to the
 * document the driver is currently focused on. Otherwise, the function will
 * test if at least one element can be found with the given search criteria.
 *
 * @param {!(webdriver.Locator|Object.<string>|Element)} locatorOrElement The
 *     locator strategy to use when searching for the element, or the actual
 *     DOM element to be located by the server.
 * @param {...} var_args Arguments to pass to {@code #executeScript} if using a
 *     JavaScript locator.  Otherwise ignored.
 * @return {!webdriver.promise.Promise} A promise that will resolve to whether
 *     the element is present on the page.
 * @export
 */
webdriver.WebDriver.prototype.isElementPresent = function(locatorOrElement,
                                                          var_args) {
  var findElement =
      locatorOrElement.nodeType === 1 && locatorOrElement.ownerDocument ?
          this.findDomElement_(/** @typedef {!Element} */locatorOrElement) :
          this.findElements.apply(this, arguments);
  return findElement.then(function(result) {
    return !!result.length;
  });
};


/**
 * Schedule a command to search for multiple elements on the page.
 *
 * @param {webdriver.Locator|Object.<string>} locator The locator
 *     strategy to use when searching for the element.
 * @param {...} var_args Arguments to pass to {@code #executeScript} if using a
 *     JavaScript locator.  Otherwise ignored.
 * @return {!webdriver.promise.Promise} A promise that will be resolved to an
 *     array of the located {@link webdriver.WebElement}s.
 * @export
 */
webdriver.WebDriver.prototype.findElements = function(locator, var_args) {
  locator = webdriver.Locator.checkLocator(locator);
  if (locator.using == 'js') {
    var args = goog.array.slice(arguments, 1);
    goog.array.splice(args, 0, 0, locator.value);

    return this.executeScript.apply(this, args).
        then(function(value) {
          if (value instanceof webdriver.WebElement) {
            return [value];
          } else if (!goog.isArray(value)) {
            return [];
          }
          return goog.array.filter(value, function(item) {
            return item instanceof webdriver.WebElement;
          });
        });
  } else {
    var command = new webdriver.Command(webdriver.CommandName.FIND_ELEMENTS).
        setParameter('using', locator.using).
        setParameter('value', locator.value);
    return this.schedule(command, 'WebDriver.findElements(' + locator + ')');
  }
};


/**
 * @return {!webdriver.WebDriver.Options} The options interface for this
 *     instance.
 * @export
 */
webdriver.WebDriver.prototype.manage = function() {
  return new webdriver.WebDriver.Options(this);
};


/**
 * @return {!webdriver.WebDriver.Navigation} The navigation interface for this
 *     instance.
 * @export
 */
webdriver.WebDriver.prototype.navigate = function() {
  return new webdriver.WebDriver.Navigation(this);
};


/**
 * @return {!webdriver.WebDriver.TargetLocator} The target locator interface for
 *     this instance.
 * @export
 */
webdriver.WebDriver.prototype.switchTo = function() {
  return new webdriver.WebDriver.TargetLocator(this);
};


/**
 * Interface for navigating back and forth in the browser history.
 * @param {!webdriver.WebDriver} driver The parent driver.
 * @constructor
 */
webdriver.WebDriver.Navigation = function(driver) {

  /**
   * The parent driver.
   * @type {!webdriver.WebDriver}
   * @private
   */
  this.driver_ = driver;
};


/**
 * Schedules a command to navigate to a new URL.
 * @param {string} url The URL to navigate to.
 * @return {!webdriver.promise.Promise} A promise that will be resolved when the
 *     URL has been loaded.
 * @export
 */
webdriver.WebDriver.Navigation.prototype.to = function(url) {
  return this.driver_.schedule(
      new webdriver.Command(webdriver.CommandName.GET).
          setParameter('url', url),
      'WebDriver.navigate().to(' + url + ')');
};


/**
 * Schedules a command to move backwards in the browser history.
 * @return {!webdriver.promise.Promise} A promise that will be resolved when the
 *     navigation event has completed.
 * @export
 */
webdriver.WebDriver.Navigation.prototype.back = function() {
  return this.driver_.schedule(
      new webdriver.Command(webdriver.CommandName.GO_BACK),
      'WebDriver.navigate().back()');
};


/**
 * Schedules a command to move forwards in the browser history.
 * @return {!webdriver.promise.Promise} A promise that will be resolved when the
 *     navigation event has completed.
 * @export
 */
webdriver.WebDriver.Navigation.prototype.forward = function() {
  return this.driver_.schedule(
      new webdriver.Command(webdriver.CommandName.GO_FORWARD),
      'WebDriver.navigate().forward()');
};


/**
 * Schedules a command to refresh the current page.
 * @return {!webdriver.promise.Promise} A promise that will be resolved when the
 *     navigation event has completed.
 * @export
 */
webdriver.WebDriver.Navigation.prototype.refresh = function() {
  return this.driver_.schedule(
      new webdriver.Command(webdriver.CommandName.REFRESH),
      'WebDriver.navigate().refresh()');
};


/**
 * Provides methods for managing browser and driver state.
 * @param {!webdriver.WebDriver} driver The parent driver.
 * @constructor
 */
webdriver.WebDriver.Options = function(driver) {

  /**
   * The parent driver.
   * @type {!webdriver.WebDriver}
   * @private
   */
  this.driver_ = driver;
};


/**
 * Schedules a command to add a cookie.
 * @param {string} name The cookie name.
 * @param {string} value The cookie value.
 * @param {string} opt_path The cookie path.
 * @param {string} opt_domain The cookie domain.
 * @param {boolean} opt_isSecure Whether the cookie is secure.
 * @return {!webdriver.promise.Promise} A promise that will be resolved when the
 *     cookie has been added to the page.
 * @export
 */
webdriver.WebDriver.Options.prototype.addCookie = function(name, value,
                                                           opt_path,
                                                           opt_domain,
                                                           opt_isSecure) {
  // We do not allow '=' or ';' in the name.
  if (/[;=]/.test(name)) {
    throw Error('Invalid cookie name "' + name + '"');
  }

  // We do not allow ';' in value.
  if (/;/.test(value)) {
    throw Error('Invalid cookie value "' + value + '"');
  }

  var cookieString = name + '=' + value +
      (opt_domain ? ';domain=' + opt_domain : '') +
      (opt_path ? ';path=' + opt_path : '') +
      (opt_isSecure ? ';secure' : '');

  return this.driver_.schedule(
      new webdriver.Command(webdriver.CommandName.ADD_COOKIE).
          setParameter('name', name).
          setParameter('value', value).
          setParameter('path', opt_path).
          setParameter('domain', opt_domain).
          setParameter('secure', !!opt_isSecure),
      'WebDriver.manage().addCookie(' + cookieString + ')');
};


/**
 * Schedules a command to delete all cookies visible to the current page.
 * @return {!webdriver.promise.Promise} A promise that will be resolved when all
 *     cookies have been deleted.
 * @export
 */
webdriver.WebDriver.Options.prototype.deleteAllCookies = function() {
  return this.driver_.schedule(
      new webdriver.Command(webdriver.CommandName.ADD_COOKIE),
      'WebDriver.manage().deleteAllCookies()');
};


/**
 * Schedules a command to delete the cookie with the given name. This command is
 * a no-op if there is no cookie with the given name visible to the current
 * page.
 * @param {string} name The name of the cookie to delete.
 * @return {!webdriver.promise.Promise} A promise that will be resolved when the
 *     cookie has been deleted.
 * @export
 */
webdriver.WebDriver.Options.prototype.deleteCookie = function(name) {
  return this.driver_.schedule(
      new webdriver.Command(webdriver.CommandName.DELETE_COOKIE),
      'WebDriver.manage().deleteCookie(' + name + ')');
};


/**
 * Schedules a command to retrieve all cookies visible to the current page.
 * Each cookie will be returned as a JSON object as described by the WebDriver
 * wire protocol.
 * @return {!webdriver.promise.Promise} A promise that will be resolved with the
 *     cookies visible to the current page.
 * @see http://code.google.com/p/selenium/wiki/JsonWireProtocol#Cookie_JSON_Object
 * @export
 */
webdriver.WebDriver.Options.prototype.getCookies = function() {
  return this.driver_.schedule(
      new webdriver.Command(webdriver.CommandName.GET_ALL_COOKIES),
      'WebDriver.manage().getCookies()');
};


/**
 * Schedules a command to retrieve the cookie with the given name. Returns null
 * if there is no such cookie. The cookie will be returned as a JSON object as
 * described by the WebDriver wire protocol.
 * @param {string} name The name of the cookie to retrieve.
 * @return {!webdriver.promise.Promise} A promise that will be resolved with the
 *     named cookie, or {@code null} if there is no such cookie.
 * @see http://code.google.com/p/selenium/wiki/JsonWireProtocol#Cookie_JSON_Object
 * @export
 */
webdriver.WebDriver.Options.prototype.getCookie = function(name) {
  return this.getCookies().addCallback(function(cookies) {
    return goog.array.find(cookies, function(cookie) {
      return cookie && cookie['name'] == name;
    });
  });
};


/**
 * @return {!webdriver.WebDriver.Timeouts} The interface for managing driver
 *     timeouts.
 * @export
 */
webdriver.WebDriver.Options.prototype.timeouts = function() {
  return new webdriver.WebDriver.Timeouts(this.driver_);
};


/**
 * An interface for managing timeout behavior for WebDriver instances.
 * @param {!webdriver.WebDriver} driver The parent driver.
 * @constructor
 */
webdriver.WebDriver.Timeouts = function(driver) {

  /**
   * The parent driver.
   * @type {!webdriver.WebDriver}
   * @private
   */
  this.driver_ = driver;
};


/**
 * Specifies the amount of time the driver should wait when searching for an
 * element if it is not immediately present.
 * <p/>
 * When searching for a single element, the driver should poll the page
 * until the element has been found, or this timeout expires before failing
 * with a {@code bot.ErrorCode.NO_SUCH_ELEMENT} error. When searching
 * for multiple elements, the driver should poll the page until at least one
 * element has been found or this timeout has expired.
 * <p/>
 * Setting the wait timeout to 0 (its default value), disables implicit
 * waiting.
 * <p/>
 * Increasing the implicit wait timeout should be used judiciously as it
 * will have an adverse effect on test run time, especially when used with
 * slower location strategies like XPath.
 *
 * @param {number} ms The amount of time to wait, in milliseconds.
 * @return {!webdriver.promise.Promise} A promise that will be resolved when the
 *     implicit wait timeout has been set.
 * @export
 */
webdriver.WebDriver.Timeouts.prototype.implicitlyWait = function(ms) {
  return this.driver_.schedule(
      new webdriver.Command(webdriver.CommandName.IMPLICITLY_WAIT).
          setParameter('ms', ms < 0 ? 0 : ms),
      'WebDriver.manage().timeouts().implicitlyWait(' + ms + ')');
};


/**
 * Sets the amount of time to wait, in milliseconds, for an asynchronous script
 * to finish execution before returning an error. If the timeout is negative,
 * the script will be allowed to run indefinitely.
 *
 * @param {number} ms The amount of time to wait, in milliseconds.
 * @return {!webdriver.promise.Promise} A promise that will be resolved when the
 *     script timeout has been set.
 * @export
 */
webdriver.WebDriver.Timeouts.prototype.setScriptTimeout = function(ms) {
  return this.driver_.schedule(
      new webdriver.Command(webdriver.CommandName.SET_SCRIPT_TIMEOUT).
          setParameter('ms', ms < 0 ? 0 : ms),
      'WebDriver.manage().timeouts().setScriptTimeout(' + ms + ')');
};


/**
 * An interface for changing the focus of the driver to another frame or window.
 * @param {!webdriver.WebDriver} driver The parent driver.
 * @constructor
 */
webdriver.WebDriver.TargetLocator = function(driver) {

  /**
   * The parent driver.
   * @type {!webdriver.WebDriver}
   * @private
   */
  this.driver_ = driver;
};


/**
 * Schedules a command retrieve the {@code document.activeElement} element on
 * the current document, or {@code document.body} if activeElement is not
 * available.
 * @return {!webdriver.WebElement} The active element.
 * @export
 */
webdriver.WebDriver.TargetLocator.prototype.activeElement = function() {
  var id = this.driver_.schedule(
      new webdriver.Command(webdriver.CommandName.GET_ACTIVE_ELEMENT),
      'WebDriver.switchTo().activeElement()');
  return new webdriver.WebElement(this.driver_, id);
};


/**
 * Schedules a command to switch focus of all future commands to the first frame
 * on the page.
 * @return {!webdriver.promise.Promise} A promise that will be resolved when the
 *     driver has changed focus to the default content.
 * @export
 */
webdriver.WebDriver.TargetLocator.prototype.defaultContent = function() {
  return this.driver_.schedule(
      new webdriver.Command(webdriver.CommandName.SWITCH_TO_FRAME).
          setParameter('id', null),
      'WebDriver.switchTo().defaultContent()');
};


/**
 * Schedules a command to switch the focus of all future commands to another
 * frame on the page.
 * <p/>
 * If the frame is specified by a number, the command will switch to the frame
 * by its (zero-based) index into the {@code window.frames} collection.
 * <p/>
 * If the frame is specified by a string, the command will select the frame by
 * its name or ID. To select sub-frames, simply separate the frame names/IDs by
 * dots. As an example, "main.child" will select the frame with the name "main"
 * and then its child "child".
 * <p/>
 * If the specified frame can not be found, the deferred result will errback
 * with a {@code bot.ErrorCode.NO_SUCH_FRAME} error.
 * @param {string|number} nameOrIndex The frame locator.
 * @return {!webdriver.promise.Promise} A promise that will be resolved when the
 *     driver has changed focus to the specified frame.
 * @export
 */
webdriver.WebDriver.TargetLocator.prototype.frame = function(nameOrIndex) {
  return this.driver_.schedule(
      new webdriver.Command(webdriver.CommandName.SWITCH_TO_FRAME).
          setParameter('id', nameOrIndex),
      'WebDriver.switchTo().frame(' + nameOrIndex + ')');
};


/**
 * Schedules a command to switch the focus of all future commands to another
 * window. Windows may be specified by their {@code window.name} attribute or
 * by its handle (as returned by {@code webdriver.WebDriver#getWindowHandles}).
 * <p/>
 * If the specificed window can not be found, the deferred result will errback
 * with a {@code bot.ErrorCode.NO_SUCH_WINDOW} error.
 * @param {string} nameOrHandle The name or window handle of the window to
 *     switch focus to.
 * @return {!webdriver.promise.Promise} A promise that will be resolved when the
 *     driver has changed focus to the specified window.
 * @export
 */
webdriver.WebDriver.TargetLocator.prototype.window = function(nameOrHandle) {
  return this.driver_.schedule(
      new webdriver.Command(webdriver.CommandName.SWITCH_TO_WINDOW).
          setParameter('name', nameOrHandle),
      'WebDriver.switchTo().frame(' + nameOrHandle + ')');
};


//////////////////////////////////////////////////////////////////////////////
//
//  webdriver.Key
//
//////////////////////////////////////////////////////////////////////////////


/**
 * Representations of pressable keys that aren't text.  These are stored in
 * the Unicode PUA (Private Use Area) code points, 0xE000-0xF8FF.  Refer to
 * http://www.google.com.au/search?&q=unicode+pua&btnG=Search
 *
 * While a proper enum, this object is defined as a map so it may be exported
 * as part of WebDriver's public API.
 *
 * @type {!Object.<string>}
 * @export
 */
webdriver.Key = {
  'NULL':         '\uE000',
  'CANCEL':       '\uE001',  // ^break
  'HELP':         '\uE002',
  'BACK_SPACE':   '\uE003',
  'TAB':          '\uE004',
  'CLEAR':        '\uE005',
  'RETURN':       '\uE006',
  'ENTER':        '\uE007',
  'SHIFT':        '\uE008',
  'CONTROL':      '\uE009',
  'ALT':          '\uE00A',
  'PAUSE':        '\uE00B',
  'ESCAPE':       '\uE00C',
  'SPACE':        '\uE00D',
  'PAGE_UP':      '\uE00E',
  'PAGE_DOWN':    '\uE00F',
  'END':          '\uE010',
  'HOME':         '\uE011',
  'ARROW_LEFT':   '\uE012',
  'ARROW_UP':     '\uE013',
  'ARROW_RIGHT':  '\uE014',
  'ARROW_DOWN':   '\uE015',
  'INSERT':       '\uE016',
  'DELETE':       '\uE017',
  'SEMICOLON':    '\uE018',
  'EQUALS':       '\uE019',

  'NUMPAD0':      '\uE01A',  // number pad keys
  'NUMPAD1':      '\uE01B',
  'NUMPAD2':      '\uE01C',
  'NUMPAD3':      '\uE01D',
  'NUMPAD4':      '\uE01E',
  'NUMPAD5':      '\uE01F',
  'NUMPAD6':      '\uE020',
  'NUMPAD7':      '\uE021',
  'NUMPAD8':      '\uE022',
  'NUMPAD9':      '\uE023',
  'MULTIPLY':     '\uE024',
  'ADD':          '\uE025',
  'SEPARATOR':    '\uE026',
  'SUBTRACT':     '\uE027',
  'DECIMAL':      '\uE028',
  'DIVIDE':       '\uE029',

  'F1':           '\uE031',  // function keys
  'F2':           '\uE032',
  'F3':           '\uE033',
  'F4':           '\uE034',
  'F5':           '\uE035',
  'F6':           '\uE036',
  'F7':           '\uE037',
  'F8':           '\uE038',
  'F9':           '\uE039',
  'F10':          '\uE03A',
  'F11':          '\uE03B',
  'F12':          '\uE03C',

  'COMMAND':      '\uE03D',  // Apple command key
  'META':         '\uE03D'   // alias for Windows key
};


/**
 * Simulate pressing many keys at once in a "chord". Takes a sequence of
 * Keys.XXXX or strings; appends each of the values to a string, and adds the
 * chord termination key (Keys.NULL) and returns the resultant string.
 *
 * Note: when the low-level webdriver key handlers see Keys.NULL, active
 * modifier keys (CTRL/ALT/SHIFT/etc) release via a keyup event.
 *
 * @param {string|webdriver.Key} var_args The key sequence to concatenate.
 * @see http://code.google.com/p/webdriver/issues/detail?id=79
 * @export
 */
webdriver.Key.chord = function(var_args) {
  var sequence = goog.array.reduce(
      goog.array.slice(arguments, 0),
      function(str, key) {
        return str + key;
      }, '');
  sequence += webdriver.Key.NULL;
  return sequence;
};


//////////////////////////////////////////////////////////////////////////////
//
//  webdriver.WebElement
//
//////////////////////////////////////////////////////////////////////////////


/**
 * Represents a DOM element. WebElements can be found by searching from the
 * document root using a {@code webdriver.WebDriver} instance, or by searching
 * under another {@code webdriver.WebElement}:
 *
 *   driver.get('http://www.google.com');
 *   var searchForm = driver.findElement(By.tagName('form'));
 *   var searchBox = searchForm.findElement(By.name('q'));
 *   searchBox.sendKeys('webdriver');
 *
 * The WebElement is implemented as a promise for compatibility with the promise
 * API. It will always resolve itself when its internal state has been fully
 * resolved and commands may be issued against the element. This can be used to
 * catch errors when an element cannot be located on the page:
 *
 *   driver.findElement(By.id('not-there')).then(function(element) {
 *     alert('Found an element that was not expected to be there!');
 *   }, function(error) {
 *     alert('The element was not found, as expected');
 *   });
 *
 * @param {!webdriver.WebDriver} driver The parent WebDriver instance for this
 *     element.
 * @param {!(string|webdriver.promise.Promise)} id Either the opaque ID for the
 *     underlying DOM element assigned by the server, or a promise that will
 *     resolve to that ID or another WebElement.
 * @constructor
 * @extends {webdriver.promise.Promise}
 */
webdriver.WebElement = function(driver, id) {
  webdriver.promise.Deferred.call(this);

  /**
   * The parent WebDriver instance for this element.
   * @type {!webdriver.WebDriver}
   */
  this.driver_ = driver;

  // This class is responsible for resolving itself; delete the resolve and
  // reject methods so they may not be accessed by consumers of this class.
  var self = this;
  var resolve = this.resolve;
  var reject = this.reject;
  delete this.promise;
  delete this.resolve;
  delete this.reject;

  /**
   * A promise that resolves to the JSON representation of this WebElement's
   * ID, as defined by the WebDriver wire protocol.
   * @type {!webdriver.promise.Promise}
   * @private
   * @see http://code.google.com/p/selenium/wiki/JsonWireProtocol
   */
  this.id_ = webdriver.promise.when(id, function(id) {
    resolve(self);

    if (id instanceof webdriver.WebElement) {
      return id.id_;
    } else if (goog.isDef(id[webdriver.WebElement.ELEMENT_KEY])) {
      return id;
    }

    var json = {};
    json[webdriver.WebElement.ELEMENT_KEY] = id;
    return json;
  }, reject);
};
goog.inherits(webdriver.WebElement, webdriver.promise.Deferred);


/**
 * The property key used in the wire protocol to indicate that a JSON object
 * contains the ID of a WebElement.
 * @type {string}
 * @const
 * @export
 */
webdriver.WebElement.ELEMENT_KEY = 'ELEMENT';


/**
 * @return {!webdriver.WebDriver} The parent driver for this instance.
 * @export
 */
webdriver.WebElement.prototype.getDriver = function() {
  return this.driver_;
};


/**
 * @return {!webdriver.promise.Promise} A promise that resolves to this
 *     element's JSON representation as defined by the WebDriver wire protocol.
 * @see http://code.google.com/p/selenium/wiki/JsonWireProtocol
 */
webdriver.WebElement.prototype.toWireValue = function() {
  return this.id_;
};


/**
 * Schedules a command that targets this element with the parent WebDriver
 * instance. Will ensure this element's ID is included in the command parameters
 * under the "id" key.
 * @param {!webdriver.Command} command The command to schedule.
 * @param {string} description A description of the command for debugging.
 * @return {!webdriver.promise.Promise} A promise that will be resolved with
 *     the command result.
 * @see webdriver.WebDriver.prototype.schedule
 * @private
 */
webdriver.WebElement.prototype.schedule_ = function(command, description) {
  command.setParameter('id', this.id_);
  return this.driver_.schedule(command, description);
};


/**
 * Schedule a command to find a descendant of this element. If the element
 * cannot be found, a {@code bot.ErrorCode.NO_SUCH_ELEMENT} result will
 * be returned by the driver. Unlike other commands, this error cannot be
 * suppressed. In other words, scheduling a command to find an element doubles
 * as an assert that the element is present on the page. To test whether an
 * element is present on the page, use {@code #isElementPresent} instead.
 * <p/>
 * The search criteria for find an element may either be a
 * {@code webdriver.Locator} object, or a simple JSON object whose sole key
 * is one of the accepted locator strategies, as defined by
 * {@code webdriver.Locator.Strategy}. For example, the following two
 * statements are equivalent:
 * <code><pre>
 * var e1 = element.findElement(By.id('foo'));
 * var e2 = element.findElement({id:'foo'});
 * </pre></code>
 * <p/>
 * Note that JS locator searches cannot be restricted to a subtree. All such
 * searches are delegated to this instance's parent WebDriver.
 *
 * @param {webdriver.Locator|Object.<string>} locator The locator
 *     strategy to use when searching for the element.
 * @param {...} var_args Arguments to pass to {@code WebDriver#executeScript} if
 *     using a JavaScript locator.  Otherwise ignored.
 * @return {webdriver.WebElement} A WebElement that can be used to issue
 *     commands against the located element. If the element is not found, the
 *     element will be invalidated and all scheduled commands aborted.
 * @export
 */
webdriver.WebElement.prototype.findElement = function(locator, var_args) {
  locator = webdriver.Locator.checkLocator(locator);
  if (locator.using == 'js') {
    return this.driver_.findElement.apply(this.driver_, arguments);
  }

  var command = new webdriver.Command(webdriver.CommandName.FIND_ELEMENT).
      setParameter('using', locator.using).
      setParameter('value', locator.value);
  var id = this.schedule_(command, 'WebElement.findElement(' + locator + ')');
  return new webdriver.WebElement(this.driver_, id);
};


/**
 * Schedules a command to test if there is at least one descendant of this
 * element that matches the given search criteria.
 *
 * <p>Note that JS locator searches cannot be restricted to a subtree of the
 * DOM. All such searches are delegated to this instance's parent WebDriver.
 *
 * @param {webdriver.Locator|Object.<string>} locator The locator
 *     strategy to use when searching for the element.
 * @param {...} var_args Arguments to pass to {@code WebDriver#executeScript} if
 *     using a JavaScript locator.  Otherwise ignored.
 * @return {!webdriver.promise.Promise} A promise that will be resolved with
 *     whether an element could be located on the page.
 * @export
 */
webdriver.WebElement.prototype.isElementPresent = function(locator, var_args) {
  locator = webdriver.Locator.checkLocator(locator);
  if (locator.using == 'js') {
    return this.driver_.isElementPresent.apply(this.driver_, arguments);
  }
  return this.findElements.apply(this, arguments).then(function(result) {
    return !!result.length;
  });
};


/**
 * Schedules a command to find all of the descendants of this element that match
 * the given search criteria.
 * <p/>
 * Note that JS locator searches cannot be restricted to a subtree. All such
 * searches are delegated to this instance's parent WebDriver.
 *
 * @param {webdriver.Locator|Object.<string>} locator The locator
 *     strategy to use when searching for the elements.
 * @param {...} var_args Arguments to pass to {@code WebDriver#executeScript} if
 *     using a JavaScript locator.  Otherwise ignored.
 * @return {!webdriver.promise.Promise} A promise that will be resolved with an
 *     array of located {@link webdriver.WebElement}s.
 * @export
 */
webdriver.WebElement.prototype.findElements = function(locator, var_args) {
  locator = webdriver.Locator.checkLocator(locator);
  if (locator.using == 'js') {
    return this.driver_.findElements.apply(this.driver_, arguments);
  }
  var command = new webdriver.Command(webdriver.CommandName.FIND_ELEMENTS).
      setParameter('using', locator.using).
      setParameter('value', locator.value);
  return this.schedule_(command, 'WebElement.findElements(' + locator + ')');
};


/**
 * Schedules a command to click on this element.
 * @return {!webdriver.promise.Promise} A promise that will be resolved when
 *     the click command has completed.
 * @export
 */
webdriver.WebElement.prototype.click = function() {
  return this.schedule_(
      new webdriver.Command(webdriver.CommandName.CLICK_ELEMENT),
      'WebElement.click()');
};


/**
 * Schedules a command to type a sequence on the DOM element represented by this
 * instance.
 * <p/>
 * Modifier keys (SHIFT, CONTROL, ALT, META) are stateful; once a modifier is
 * processed in the keysequence, that key state is toggled until one of the
 * following occurs:
 * <ul>
 * <li>The modifier key is encountered again in the sequence. At this point the
 * state of the key is toggled (along with the appropriate keyup/down events).
 * </li>
 * <li>The {@code webdriver.Key.NULL} key is encountered in the sequence. When
 * this key is encountered, all modifier keys current in the down state are
 * released (with accompanying keyup events). The NULL key can be used to
 * simulate common keyboard shortcuts:
 * <code>
 *     element.sendKeys("text was",
 *                      webdriver.Key.CONTROL, "a", webdriver.Key.NULL,
 *                      "now text is");
 *     // Alternatively:
 *     element.sendKeys("text was",
 *                      webdriver.Key.chord(webdriver.Key.CONTROL, "a"),
 *                      "now text is");
 * </code></li>
 * <li>The end of the keysequence is encountered. When there are no more keys
 * to type, all depressed modifier keys are released (with accompanying keyup
 * events).
 * </li>
 * </ul>
 * <strong>Note:</strong> On browsers where native keyboard events are not yet
 * supported (e.g. Firefox on OS X), key events will be synthesized. Special
 * punctionation keys will be synthesized according to a standard QWERTY English
 * keyboard layout.
 *
 * @param {...string} var_args The sequence of keys to
 *     type. All arguments will be joined into a single sequence (var_args is
 *     permitted for convenience).
 * @return {!webdriver.promise.Promise} A promise that will be resolved when all
 *     keys have been typed.
 * @export
 */
webdriver.WebElement.prototype.sendKeys = function(var_args) {
  // Coerce every argument to a string. This protects us from users that
  // ignore the jsdoc and give us a number (which ends up causing problems on
  // the server, which requires strings).
  var keys = webdriver.promise.fullyResolved(goog.array.slice(arguments, 0)).
      then(function(args) {
        return goog.array.map(goog.array.slice(args, 0), function(key) {
          return key + '';
        });
      });
  return this.schedule_(
      new webdriver.Command(webdriver.CommandName.SEND_KEYS_TO_ELEMENT).
          setParameter('value', keys),
      'WebElement.sendKeys(' + keys + ')');
};


/**
 * Schedules a command to query for the tag/node name of this element.
 * @return {!webdriver.promise.Promise} A promise that will be resolved with the
 *     element's tag name.
 * @export
 */
webdriver.WebElement.prototype.getTagName = function() {
  return this.schedule_(
      new webdriver.Command(webdriver.CommandName.GET_ELEMENT_TAG_NAME),
      'WebElement.getTagName()');
};


/**
 * Schedules a command to query for the computed style of the element
 * represented by this instance. If the element inherits the named style from
 * its parent, the parent will be queried for its value.  Where possible, color
 * values will be converted to their hex representation (e.g. #00ff00 instead of
 * rgb(0, 255, 0)).
 * <p/>
 * <em>Warning:</em> the value returned will be as the browser interprets it, so
 * it may be tricky to form a proper assertion.
 *
 * @param {string} cssStyleProperty The name of the CSS style property to look
 *     up.
 * @return {!webdriver.promise.Promise} A promise that will be resolved with the
 *     requested CSS value.
 * @export
 */
webdriver.WebElement.prototype.getCssValue = function(cssStyleProperty) {
  var name = webdriver.CommandName.GET_ELEMENT_VALUE_OF_CSS_PROPERTY;
  return this.schedule_(
      new webdriver.Command(name).setParameter('name', cssStyleProperty),
      'WebElement.getCssValue(' + cssStyleProperty + ')');
};


/**
 * Schedules a command to query for the value of the given attribute of the
 * element. Will return the current value even if it has been modified after the
 * page has been loaded. More exactly, this method will return the value of the
 * given attribute, unless that attribute is not present, in which case the
 * value of the property with the same name is returned. If neither value is
 * set, null is returned. The "style" attribute is converted as best can be to a
 * text representation with a trailing semi-colon. The following are deemed to
 * be "boolean" attributes and will be returned as thus:
 *
 * <p>async, autofocus, autoplay, checked, compact, complete, controls, declare,
 * defaultchecked, defaultselected, defer, disabled, draggable, ended,
 * formnovalidate, hidden, indeterminate, iscontenteditable, ismap, itemscope,
 * loop, multiple, muted, nohref, noresize, noshade, novalidate, nowrap, open,
 * paused, pubdate, readonly, required, reversed, scoped, seamless, seeking,
 * selected, spellcheck, truespeed, willvalidate
 *
 * <p>Finally, the following commonly mis-capitalized attribute/property names
 * are evaluated as expected:
 * <ul>
 *   <li>"class"
 *   <li>"readonly"
 * </ul>
 * @param {string} attributeName The name of the attribute to query.
 * @return {!webdriver.promise.Promise} A promise that will be resolved with the
 *     attribute's value.
 * @export
 */
webdriver.WebElement.prototype.getAttribute = function(attributeName) {
  return this.schedule_(
      new webdriver.Command(webdriver.CommandName.GET_ELEMENT_ATTRIBUTE).
          setParameter('name', attributeName),
      'WebElement.getAttribute(' + attributeName + ')');
};


/**
 * Get the visible (i.e. not hidden by CSS) innerText of this element, including
 * sub-elements, without any leading or trailing whitespace.
 * @return {!webdriver.promise.Promise} A promise that will be resolved with the
 *     element's visible text.
 * @export
 */
webdriver.WebElement.prototype.getText = function() {
  return this.schedule_(
      new webdriver.Command(webdriver.CommandName.GET_ELEMENT_TEXT),
      'WebElement.getText()');
};


/**
 * Schedules a command to compute the size of this element's bounding box, in
 * pixels.
 * @return {!webdriver.promise.Promise} A promise that will be resolved with the
 *     element's size as a {@code {width:number, height:number}} object.
 * @export
 */
webdriver.WebElement.prototype.getSize = function() {
  return this.schedule_(
      new webdriver.Command(webdriver.CommandName.GET_ELEMENT_SIZE),
      'WebElement.getSize()');
};


/**
 * Schedules a command to compute the location of this element in page space.
 * @return {!webdriver.promise.Promise} A promise that will be resolved to the
 *     element's location as a {@code {x:number, y:number}} object.
 * @export
 */
webdriver.WebElement.prototype.getLocation = function() {
  return this.schedule_(
      new webdriver.Command(webdriver.CommandName.GET_ELEMENT_LOCATION),
      'WebElement.getLocation()');
};



/**
 * Schedules a command to query whether the DOM element represented by this
 * instance is enabled, as dicted by the {@code disabled} attribute.
 * @return {!webdriver.promise.Promise} A promise that will be resolved with
 *     whether this element is currently enabled.
 * @export
 */
webdriver.WebElement.prototype.isEnabled = function() {
  return this.schedule_(
      new webdriver.Command(webdriver.CommandName.IS_ELEMENT_ENABLED),
      'WebElement.isEnabled()');
};


/**
 * Schedules a command to query whether this element is selected.
 * @return {!webdriver.promise.Promise} A promise that will be resolved with
 *     whether this element is currently selected.
 * @export
 */
webdriver.WebElement.prototype.isSelected = function() {
  return this.schedule_(
      new webdriver.Command(webdriver.CommandName.IS_ELEMENT_SELECTED),
      'WebElement.isSelected()');
};


/**
 * Schedules a command to submit the form containing this element (or this
 * element if it is a FORM element). This command is a no-op if the element is
 * not contained in a form.
 * @return {!webdriver.promise.Promise} A promise that will be resolved when
 *     the form has been submitted.
 * @export
 */
webdriver.WebElement.prototype.submit = function() {
  return this.schedule_(
      new webdriver.Command(webdriver.CommandName.SUBMIT_ELEMENT),
      'WebElement.submit()');
};


/**
 * Schedules a command to clear the {@code value} of this element. This command
 * has no effect if the underlying DOM element is neither a text INPUT element
 * nor a TEXTAREA element.
 * @return {!webdriver.promise.Promise} A promise that will be resolved when
 *     the element has been cleared.
 * @export
 */
webdriver.WebElement.prototype.clear = function() {
  return this.schedule_(
      new webdriver.Command(webdriver.CommandName.CLEAR_ELEMENT),
      'WebElement.clear()');
};


/**
 * Schedules a command to test whether this element is currently displayed.
 * @return {!webdriver.promise.Promise} A promise that will be resolved with
 *     whether this element is currently visible on the page.
 * @export
 */
webdriver.WebElement.prototype.isDisplayed = function() {
  return this.schedule_(
      new webdriver.Command(webdriver.CommandName.IS_ELEMENT_DISPLAYED),
      'WebElement.isDisplayed()');
};


/**
 * Schedules a command to retrieve the outer HTML of this element.
 * @return {!webdriver.promise.Promise} A promise that will be resolved with
 *     the element's outer HTML.
 * @export
 */
webdriver.WebElement.prototype.getOuterHtml = function() {
  return this.driver_.executeScript(function() {
    var element = arguments[0];
    if ('outerHTML' in element) {
      return element.outerHTML;
    } else {
      var div = element.ownerDocument.createElement('div');
      div.appendChild(element.cloneNode(true));
      return div.innerHTML;
    }
  }, this);
};


/**
 * Schedules a command to retrieve the inner HTML of this element.
 * @return {!webdriver.promise.Promise} A promise that will be resolved with the
 *     element's inner HTML.
 * @export
 */
webdriver.WebElement.prototype.getInnerHtml = function() {
  return this.driver_.executeScript('return arguments[0].innerHTML', this);
};

