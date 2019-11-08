# Oracle JET : JET Examples

**Version 7.1.0 of Oracle JET**

## ojet-interationalization

Contains the Logic for changing and managing the current Language.

See: http://danielmerchanoracle.blogspot.com/2019/02/ojet-internationalization-localization.html

## ojet-packagewar
Uses **grunt-war** for generating a WAR file after **ojet build** is invoked by including extra code in the **hook filer after_build.js**

See: http://danielmerchanoracle.blogspot.com/2019/03/ojet-build-and-deploy-in-application-server.html

## ojet-waysofcallingrest
Includes three REST GET examples using Vanilla JavaScript < ES6, JQuery and JavaScript ES6+ Fetch, Await

See: http://danielmerchanoracle.blogspot.com/2019/03/ojet-calling-rest-service.html

## ojet-logging
Integration of **js-logger** with Oracle JET for custom Logging and also pushing the Log to the Server if needed via REST Service. The REST service is not implemented, but the placeholder is there to do it ;).

See: http://danielmerchanoracle.blogspot.com/2019/03/ojet-logging-with-js-logger.html

## ojet-wcp-router
A possible way to move from Oracle WebCenter Portal Navigation model to Oracle JET Router

See: http://danielmerchanoracle.blogspot.com/2019/04/wcp-navigation-model-to-ojet-router.html

## ojet-adf-region-to-ojmodule
Contains an example based on **ojet-wcp-router** which uses the concept of <oj-module> (Oracle JET Module Architecture) to build re-usable modules such as ADF Regions / Portlets are in Oracle WebCenter Portal
  
See: http://danielmerchanoracle.blogspot.com/2019/04/wcpadf-to-ojet-adf-taskflow-portlet-to-ojet-module.html

## ojet-typescript-template
Contains the Oracle JET TypeScript started template of https://www.oracle.com/technetwork/developer-tools/jet/downloads/index.html
with a minor fix in the Router configuration

> **Note:** Since Oracle JET 7.2.0 you can use the OJET-CLI to scaffold a Oracle JET Application with TypeScript
> **Example** ```ojet create web-app-navbar --template=navbar --typescript```

See: http://danielmerchanoracle.blogspot.com/2019/04/ojet-bug-with-routing-in-typescript-template.html

## ojet-typescript-list-detail
Contains an example built on top of the Oracle JET TypeScript template which shows the usage of ViewModel Parameters and signals npm module for Inter-Module communication

See: http://danielmerchanoracle.blogspot.com/2019/04/ojet-inter-modular-communication-in-ts-template.html

> **Note:** Since Oracle JET 7.2.0 you can use the OJET-CLI to scaffold a Oracle JET Application with TypeScript
> **Example** ```ojet create web-app-navbar --template=navbar --typescript```

## ojet-add-jet-comp-programmatically
Adds programmatically an ```<oj-checkboxset>``` and an ```<oj-input-text``` from the ViewModel into a View

## ojet-checkboxset-select-all
Example about how to make a Select All for a ```<oj-checkboxset>``` based on another ```<oj-checkboxset>```