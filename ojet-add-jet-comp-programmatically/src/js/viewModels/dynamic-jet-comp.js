/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['knockout', 'ojs/ojinputtext', 'ojs/ojcheckboxset'],
  function (ko) {

    function DynamicJETViewModel() {
      var self = this;
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /** 
       * Observable holding the Example Text introduced in the Input Text 
      */
      self.inputTextValue = ko.observable("Example");
      self.checkBoxSelection = ko.observableArray([]);
      self.checkBoxSetClicked = (event) => {
        alert('Checkboxes active: ' + event.detail.value);
      }

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
        const fakeDiv = document.getElementById('fake');
        fakeDiv.insertAdjacentHTML('beforeend','<oj-input-text id="aa" value="{{inputTextValue}}"></oj-input-text>');
        fakeDiv.insertAdjacentHTML('beforeend','<oj-checkboxset on-value-changed="[[checkBoxSetClicked]]" value={{checkBoxSelection}} label-hint="Enabled"><oj-option value="desktop">Desktop</oj-option><oj-option value="laptop">Laptop</oj-option><oj-option value="tablet">Tablet</oj-option></oj-checkboxset>' )
        ko.cleanNode(fakeDiv);
        ko.applyBindings(this,fakeDiv);
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DynamicJETViewModel();
  }
);
