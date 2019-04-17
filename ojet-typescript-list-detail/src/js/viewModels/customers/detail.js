/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your viewModel code goes here
 */
define(["require", "exports", "knockout", "ojs/ojbutton", "ojs/ojtoolbar", "ojs/ojlabel"], function (require, exports, ko) {
    "use strict";
    var CustomersDetailViewModel = /** @class */ (function () {
        function CustomersDetailViewModel(params) {
            var _this = this;
            var self = this;
            self.backToListSignal = params.backToListSignal;
            var customers = params.customers;
            var customerId = params.customerId;
            self.customerSelected = ko.observable(customers[customerId]);
            self.backButtonAction = function (_event) {
                _this.backToListSignal.dispatch();
            };
        }
        /**
         * Optional ViewModel method invoked after the View is inserted into the
         * document DOM.  The application can put logic that requires the DOM being
         * attached here.
         * This method might be called multiple times - after the View is created
         * and inserted into the DOM and after the View is reconnected
         * after being disconnected.
         */
        CustomersDetailViewModel.prototype.connected = function () {
            // Implement if needed
        };
        ;
        /**
         * Optional ViewModel method invoked after the View is disconnected from the DOM.
         */
        CustomersDetailViewModel.prototype.disconnected = function () {
            // Implement if needed
        };
        ;
        /**
         * Optional ViewModel method invoked after transition to the new View is complete.
         * That includes any possible animation between the old and the new View.
         */
        CustomersDetailViewModel.prototype.transitionCompleted = function () {
            // Implement if needed
        };
        ;
        return CustomersDetailViewModel;
    }());
    return CustomersDetailViewModel;
});
//# sourceMappingURL=detail.js.map