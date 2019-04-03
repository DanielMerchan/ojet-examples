/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojmodule-element-utils', 'jquery', 'ojs/ojmodule-element'],
  function (oj, ko, moduleUtils, $) {

    function HomeViewModel() {
      var self = this;
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      // 1. Prepare the configuration to load the OJ-Module of Activity-Stream
      // self.actStrModuleConfig = ko.observable({ 'view': [], 'viewModel': null });
      self.actStrModuleConfig = ko.observable({ 'view': [], 'viewModel': null });
      const loadActStrModuleConfig = (moduleConfig) => {
        const viewPath = 'views/modules/activities/activity-stream.html';
        const viewModelPath = 'viewModels/modules/activities/activity-stream';
        let masterPromise = Promise.all([moduleUtils.createView({ 'viewPath': viewPath }), moduleUtils.createViewModel({ 'viewModelPath': viewModelPath })
        ]);
        masterPromise.then(values => {
          console.log(values[0]);
          console.log(values[1]);
          moduleConfig({'view':values[0],'viewModel':values[1]});
        }, error => {
          console.log(error);
        })
      };
      loadActStrModuleConfig(self.actStrModuleConfig); 

      // 2. Prepare the configuration to load the OJ-Module of PageTraffic-Stream
      // self.actStrModuleConfig = ko.observable({ 'view': [], 'viewModel': null });
      self.pageTrafficModuleConfig = ko.observable({ 'view': [], 'viewModel': null });
      const loadPageTrafficModuleConfig = (moduleConfig) => {
        const viewPath = 'views/modules/analytics/page-traffic.html';
        const viewModelPath = 'viewModels/modules/analytics/page-traffic';
        let masterPromise = Promise.all([moduleUtils.createView({ 'viewPath': viewPath }), moduleUtils.createViewModel({ 'viewModelPath': viewModelPath })
        ]);
        masterPromise.then(values => {
          console.log(values[0]);
          console.log(values[1]);
          moduleConfig({'view':values[0],'viewModel':values[1]});
        }, error => {
          console.log(error);
        })
      };
      loadPageTrafficModuleConfig(self.pageTrafficModuleConfig);
      

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here. 
       * This method might be called multiple times - after the View is created 
       * and inserted into the DOM and after the View is reconnected 
       * after being disconnected.
       */
      self.connected = function () {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function () {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function () {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new HomeViewModel();
  }
);
