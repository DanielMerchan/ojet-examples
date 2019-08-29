/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['knockout', 'text!../resources/mock/basicData.json', 
'ojs/ojarraydataprovider', 'html2pdf', 'ojs/ojchart', 'ojs/ojbutton'],
 function(ko, data, ArrayDataProvider, html2pdf) {

    function DashboardViewModel() {
      var self = this;
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      // Chart Example
      self.stackValue = ko.observable('off');
      self.orientationValue = ko.observable('vertical');
      self.dataProvider = new ArrayDataProvider(JSON.parse(data), {keyAttributes: 'id'});

      // Export PDF
      self.printPDF = () => {
        barChartElement = document.getElementById('chart-container');
        const options = {
          margin: 1,
          filename: 'mierda',
          image: {
            type: 'jpeg',
            quality: 0.98
          },
          html2canvas: {
            scale: 2,
            dpi: 192,
            letterRendering: true,
            onclone: (element) => {
              const svgElements = Array.from(element.querySelectorAll('svg'));
              svgElements.forEach(s => {
                const bBox = s.getBBox();
                s.setAttribute("x", bBox.x);
                s.setAttribute("y", bBox.y);
                s.setAttribute("width", bBox.width);
                s.setAttribute("height", bBox.height);
              })
            }
          },
          jsPDF: {
            unit: 'in',
            format: 'letter',
            orientation: 'portrait'
          }
        }
        let PUTAMIERDA = new html2pdf(barChartElement.innerHTML, options);
        html2pdf.downloadPdf(PUTAMIERDA);
        // console.log(barChartElement);
        // var x = new html2pdf(barChartElement);
        // console.log(x);
        // console.log(html2pdf);
      }

      // HTML2PDF related code

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
