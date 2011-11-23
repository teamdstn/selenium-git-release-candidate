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

/**
 * @fileoverview Initializes the remote client UI.
 */

goog.require('remote.ui.Client');


goog.exportSymbol('init', function() {
  // On the java Selenium server, this script and other files in the UI
  // are served by org.openqa.selenium.remote.server.DriverServlet under
  // the /static/resource path.  We need to drop this so commands are
  // relative to the DriverServlet's root.
  var loc = window.location;
  var href = [
      loc.protocol, '//', loc.host,
      loc.pathname.replace(/\/static\/resource(?:\/[^\/]*)?$/, '')
  ].join('');

  var client = new remote.ui.Client(href);
  client.init();
});
