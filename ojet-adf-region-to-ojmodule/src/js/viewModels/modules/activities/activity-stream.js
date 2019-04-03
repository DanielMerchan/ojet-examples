/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojvalidation-number', 'ojs/ojchart', 'ojs/ojgauge', 'ojs/ojselectcombobox', 'ojs/ojlabel'],
 function(oj, ko, $) {
  
    function ActivityStreamViewModel() {
      var self = this;
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      var self = this;

        /**
         * Generates random series data items
         * @param {Number} start The start time
         * @param {Number} interval The interval between data points
         * @param {Number} numGroups Number of groups
         * @return {Object} Data object containing random data
         */
        var generateSeriesDataItems = function (numGroups) {
          var items = [];
          var time, s, curValue;
          items[0] = {'open': 200, 'close': Math.random() * 5 + 200, 'high': 202, 'low': 199, 'volume': 1000000}
          for (s = 1; s < numGroups; s++) {
            var open = items[s - 1]['close'];
            var close = open + Math.random() * 5 * Math.pow(-1, Math.round(Math.random()));
            var high = Math.max(open, close) + Math.random() * 2;
            var low = Math.min(open, close) - Math.random() * 2;
            items.push({'open': open, 'close': close, 'high': high, 'low': low, volume: 1000000 + Math.random() * 10000000});
          }
          return items;
        }

        /**
         * Generates groups
         * @param {Number} start The start time
         * @param {Number} interval The interval between data points
         * @param {Number} numGroups Number of groups
         * @return {Object} Data object containing random data
         */
        var generateGroups = function (start, interval, numGroups) {
          var groups = [];
          for (s = 0; s < numGroups; s++) {
            if (s % 7 != 6 && s % 7 != 5) {
              var time = start + s * interval;
              groups.push(time);
            }
          }
          return groups;
        }

        var dayInMs = 1000 * 60 * 60 * 24;
        //March 27th 2015
        self.currentTime = 1427486400000;
        var converterFactory = oj.Validation.converterFactory('number');
        self.yAxisConverter = ko.observable(converterFactory.createConverter({style: 'currency', currency: 'USD'}));
        self.seriesTypeValue = ko.observable('auto');
        self.selectionValue = ko.observable('multiple');

        self.selectionValueChange = function(event) {
          self.selectedItemsValue([]);
          self.selectText('');
          self.selectionInfo('');
        }

        self.selectedItemsValue = ko.observableArray([]);
        self.selectionOptions = [
          {id: 'none', label: 'none', value: 'none'},
          {id: 'single', label: 'single', value: 'single'},
          {id: 'multiple', label: 'multiple', value: 'multiple'}
        ];
        self.selectText= ko.observable('')
        self.selectionInfo = ko.observable('');

        self.stockSeriesDataItemsValue = ko.observableArray(generateSeriesDataItems(30));
        self.groupValues = ko.observableArray(generateGroups(self.currentTime - dayInMs * 39, dayInMs, 42));
        self.seriesValues = ko.computed(function() {
          return [{name: "FAKE", type: self.seriesTypeValue(), items: self.stockSeriesDataItemsValue()}];
        });
        
        self.selectionListener = function(event) {
          var items = "items:<br/>";
          var detail = event.detail;
          if(detail['value'].length > 0) {
            for(var i = 0; i < detail['value'].length; i++){
              if(detail['value'][i] && detail['selectionData']) {
                var date = new Date(detail['selectionData'][i]["groupData"][0]);
                items += (date.getDate() + " " + date.toString().split(' ')[1] + " " + date.getFullYear() + '<br/>');
              }
            }
            self.selectionInfo(items);
            self.selectText('select:');
          } 
          else {
            self.selectText('');
            self.selectionInfo('');
          }
        }

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
    return new ActivityStreamViewModel();
  }
);
