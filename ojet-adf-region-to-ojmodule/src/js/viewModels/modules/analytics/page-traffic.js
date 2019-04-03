/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojchart', 'ojs/ojtoolbar'],
 function(oj, ko, $) {
  
    function PageTrafficViewModel() {
      var self = this;
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /* toggle button variables */
      self.stackValue = ko.observable('on');
      self.orientationValue = ko.observable('vertical');
      self.dualY = ko.observable('off');
   
      self.splitterValue = ko.observable(0.5);
      
      /* chart data */
      var dualYSeries = [{name: "Series 1", items: [42, 55, 36, 22]},
                         {name: "Series 2", items: [32, 39, 36, 27]},
                         {name: "Series 3", items: [34, 30, 50, 46], assignedToY2: "on"}];
  
      var dualYGroups = ["Group A", "Group B", "Group C", "Group D"];        
 
      self.barSeriesValue = ko.observableArray(dualYSeries);
      self.barGroupsValue = ko.observableArray(dualYGroups);
      
      /* toggle buttons*/
      self.dualYOptions = [
          {id: 'on', label: 'on', value: 'on'},
          {id: 'off', label: 'off', value: 'off'}
      ];
      self.updateDualY = function(event) {
          document.getElementById('splitterPosition').disabled = (event.detail.value === 'off');
      };

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here. 
       * This method might be called multiple times - after the View is created 
       * and inserted into the DOM and after the View is reconnected 
       * after being disconnected.
       */
      self.connected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new PageTrafficViewModel();
  }
);
