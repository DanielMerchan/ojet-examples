/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'text!../endpoints.json'],
 function(oj, ko, $, endpoints) {
  
    function DashboardViewModel() {
      var self = this;
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      self.activitiesURL = JSON.parse(endpoints).activities;
      console.log(`Activities Endpoint: ${self.activitiesURL}`);

      // 1. GET Call Using Vanilla JavaScript - Asynchronous
      const xhr = new XMLHttpRequest();
      xhr.open('GET',self.activitiesURL,true); // True marks it as Asyncrhonous
      xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          console.log("GET VANILLA JAVASCRIPT RESPONSE");
          // Call your Function to treat the JSON and operate with it
          const activities = JSON.parse(xhr.responseText).items;
          activities.forEach(activity => {
            console.log(`Activity 1: ${activity.name}`);
          }) 
        } else if (xhr.status === 500) {
          console.log("Error: " + xhr.status + " " + xhr.statusText);
        }
      }
      // GET, nothing to send
      xhr.send();

      // 2. GET Call Using JQuery - Aysynchronous
      $.getJSON(self.activitiesURL, activitiesResponse => {
        const activities = activitiesResponse.items;
        console.log("GET JQUERY JAVASCRIPT RESPONSE");
        activities.forEach(activity => {
          console.log(`Activity 2: ${activity.name}`);
        });
      }).fail(function (xhr, status, error) {
        console.log("Error: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
      });

      // 3.A GET Using Fetch and Await Async
      self.fetchActivitiesAsync = async () => {
        try {
          const response = await fetch(self.activitiesURL);
          if (response.ok) {
            console.log("GET FETCH/AWAIT using JAVASCRIPT ASYNC Function");
            const jsonResponse = await response.json();
            return jsonResponse;
          }
          throw new Error('Request Failed');
        } catch (error) {
          console.log(error);
        }
      };
      // 3.A Call the Asynchronous Function declared above
      self.fetchActivitiesAsync().then(activities => activities.items.forEach(activity => {
        console.log(`Activity 3.A: ${activity.name}`);
      })).catch(error => {
        console.log(error);
      });

      // 3.B Without function
      fetch(self.activitiesURL).then(activitiesResponse => {
        console.log("GET using FETCH which is asynchronous without an extra function");
        if (activitiesResponse.ok) {
          activitiesResponse.json().then(activitiesJson => {
            activitiesJson.items.forEach(activity => {
              console.log(`Activity 3.B: ${activity.name}`);
            })
          })
        }
      });


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
    return new DashboardViewModel();
  }
);
