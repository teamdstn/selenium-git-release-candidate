// <copyright file="GlobalSuppressions.cs" company="WebDriver Committers">
// Copyright 2007-2011 WebDriver committers
// Copyright 2007-2011 Google Inc.
// Portions copyright 2007 ThoughtWorks, Inc
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// </copyright>

// This file is used by Code Analysis to maintain SuppressMessage 
// attributes that are applied to this project. 
// Project-level suppressions either have no target or are given 
// a specific target and scoped to a namespace, type, member, etc. 
//
// To add a suppression to this file, right-click the message in the 
// Error List, point to "Suppress Message(s)", and click 
// "In Project Suppression File". 
// You do not need to add suppressions to this file manually. 

[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1020:AvoidNamespacesWithFewTypes", Scope = "namespace", Target = "OpenQA.Selenium.Support.PageObjects", Justification = "Number of namespace classes is subject to increase.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1054:UriParametersShouldNotBeStrings", MessageId = "1#", Scope = "member", Target = "OpenQA.Selenium.Support.Events.WebDriverNavigationEventArgs.#.ctor(OpenQA.Selenium.IWebDriver,System.String)", Justification = "Using string to preserve user input.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1056:UriPropertiesShouldNotBeStrings", Scope = "member", Target = "OpenQA.Selenium.Support.Events.WebDriverNavigationEventArgs.#Url", Justification = "Using string to preserve user input.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringWebElement.#ParentDriver", Justification = "Method must be available for subclasses.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver.#Close()", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver.#CurrentWindowHandle", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver.#ExecuteAsyncScript(System.String,System.Object[])", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver.#ExecuteScript(System.String,System.Object[])", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver.#FindElement(OpenQA.Selenium.By)", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver.#FindElements(OpenQA.Selenium.By)", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver.#PageSource", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver.#Quit()", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver.#Title", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver.#Url", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver.#WindowHandles", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringNavigation.#Back()", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringNavigation.#Forward()", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringNavigation.#GoToUrl(System.String)", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringNavigation.#GoToUrl(System.Uri)", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringNavigation.#Refresh()", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringTargetLocator.#ActiveElement()", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringTargetLocator.#Alert()", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringTargetLocator.#DefaultContent()", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringTargetLocator.#Frame(OpenQA.Selenium.IWebElement)", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringTargetLocator.#Frame(System.Int32)", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringTargetLocator.#Frame(System.String)", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringTargetLocator.#Window(System.String)", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringWebElement.#Clear()", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringWebElement.#Click()", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringWebElement.#Displayed", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringWebElement.#Enabled", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringWebElement.#FindElement(OpenQA.Selenium.By)", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringWebElement.#FindElements(OpenQA.Selenium.By)", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringWebElement.#GetAttribute(System.String)", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringWebElement.#GetCssValue(System.String)", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringWebElement.#Location", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringWebElement.#Selected", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringWebElement.#SendKeys(System.String)", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringWebElement.#Size", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringWebElement.#Submit()", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringWebElement.#TagName", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Scope = "member", Target = "OpenQA.Selenium.Support.Events.EventFiringWebDriver+EventFiringWebElement.#Text", Justification = "Firing event on all execptions, so catching generic Exception is appropriate.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Globalization", "CA1308:NormalizeStringsToUppercase", Scope = "member", Target = "OpenQA.Selenium.Support.UI.SelectElement.#.ctor(OpenQA.Selenium.IWebElement)", Justification = "WebDriver normalizes strings to lowercase.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1065:DoNotRaiseExceptionsInUnexpectedLocations", Scope = "member", Target = "OpenQA.Selenium.Support.UI.SelectElement.#SelectedOption", Justification = "Exception should be thrown in this property.")]
