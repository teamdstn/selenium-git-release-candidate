// Copyright 2011 WebDriver committers
// Copyright 2011 Google Inc.
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

goog.provide('webdriver.Session');


/**
 * Contains information about a WebDriver session.
 * @param {string} id The session ID.
 * @param {!Object.<*>} capabilities A map describing the capabilities
 *     of this session.
 * @constructor
 * @export
 */
webdriver.Session = function(id, capabilities) {

  /**
   * The session ID.
   * @type {string}
   */
  this.id = id;

  /**
   * A map describing the capabilities of this session.
   * @type {!Object.<*>}
   */
  this.capabilities = capabilities;
};


/**
 * @return {string} This session's ID.
 * @export
 */
webdriver.Session.prototype.getId = function() {
  return this.id;
};


/**
 * @return {!Object.<*>} This session's capabilities.
 * @export
 */
webdriver.Session.prototype.getCapabilities = function() {
  return this.capabilities;
};


/**
 * Returns the JSON representation of this object, which is just the string
 * session ID.
 * @return {string} The JSON representation of this Session.
 */
webdriver.Session.prototype.toJSON = function() {
  return this.id;
};
