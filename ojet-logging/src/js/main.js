/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';

/**
 * Example of Require.js boostrap javascript
 */

requirejs.config(
  {
    baseUrl: 'js',

    // Path mappings for the logical module names
    // Update the main-release-paths.json for release mode when updating the mappings
    paths:
    //injector:mainReleasePaths
    {
      'knockout': 'libs/knockout/knockout-3.4.2.debug',
      'jquery': 'libs/jquery/jquery-3.3.1',
      'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.1',
      'promise': 'libs/es6-promise/es6-promise',
      'hammerjs': 'libs/hammer/hammer-2.0.8',
      'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0',
      'ojs': 'libs/oj/v6.1.0/debug',
      'ojL10n': 'libs/oj/v6.1.0/ojL10n',
      'ojtranslations': 'libs/oj/v6.1.0/resources',
      'text': 'libs/require/text',
      'signals': 'libs/js-signals/signals',
      'customElements': 'libs/webcomponents/custom-elements.min',
      'proj4': 'libs/proj4js/dist/proj4-src',
      'css': 'libs/require-css/css',
      'touchr': 'libs/touchr/touchr',
      'js-logger': 'libs/js-logger/logger'
    }
    //endinjector
  }
);

/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback
 */
require(['ojs/ojcore', 'knockout', 'appController', 'jquery', 'js-logger', 'ojs/ojknockout',
  'ojs/ojmodule', 'ojs/ojrouter', 'ojs/ojnavigationlist', 'ojs/ojbutton', 'ojs/ojtoolbar'],
  function (oj, ko, app, $, Logger) { // this callback gets executed when all required modules are loaded

    $(function () {

      function init() {
        oj.Router.sync().then(
          function () {
            app.loadModule();
            // Bind your ViewModel for the content of the whole page body.
            ko.applyBindings(app, document.getElementById('globalBody'));
          },
          function (error) {
            oj.Logger.error('Error in root start: ' + error.message);
          }
        );

        // 1. Default Logger configuration. It configures the Console Handler as defualt Handler and the formatter
        Logger.useDefaults({
        });
        
        // 2. Override the Logger Configuration
        const loggerOptions = {
          defaultLevel: Logger.DEBUG,
          formatter : function (messages, context) {
            messages.unshift(new Date().toUTCString());
            messages.unshift("[" + context.name + "]");
          }
        }
        const consoleHandler = Logger.createDefaultHandler(loggerOptions);
        const myServerHandler = function(messages,context) {
          //jQuery.post('/logs', { message: messages[0], level: context.level });
          console.log("PUSH to Server");
        }

        Logger.setHandler(function(messages,context) {
          consoleHandler(messages,context);
          myServerHandler(messages,context);
        })
      
        const mainLogger = Logger.get("main");
        mainLogger.warn("Logging initialized");

      }

      // If running in a hybrid (e.g. Cordova) environment, we need to wait for the deviceready 
      // event before executing any code that might interact with Cordova APIs or plugins.
      if ($(document.body).hasClass('oj-hybrid')) {
        document.addEventListener("deviceready", init);
      } else {
        init();
      }

    });

  }
);
