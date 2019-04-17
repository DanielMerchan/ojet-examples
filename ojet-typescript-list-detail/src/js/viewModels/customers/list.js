/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your viewModel code goes here
 */
define(["require", "exports", "ojs/ojarraydataprovider", "ojs/ojlistview"], function (require, exports, ArrayDataProvider) {
    "use strict";
    var CustomersListViewModel = /** @class */ (function () {
        function CustomersListViewModel(params) {
            console.log('constructor');
            var self = this;
            self.customerSelectedSignal = params.customerSelectedSignal;
            self.customers = params.customers;
            self.customersArrayDataProvider = new ArrayDataProvider(self.customers, { keyAttributes: 'id' });
            self.onSelectCustomer = function (event) {
                self.customerSelectedSignal.dispatch(event.detail.value);
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
        CustomersListViewModel.prototype.connected = function () {
            // Implement if needed
        };
        ;
        /**
         * Optional ViewModel method invoked after the View is disconnected from the DOM.
         */
        CustomersListViewModel.prototype.disconnected = function () {
            // Implement if needed
        };
        ;
        /**
         * Optional ViewModel method invoked after transition to the new View is complete.
         * That includes any possible animation between the old and the new View.
         */
        CustomersListViewModel.prototype.transitionCompleted = function () {
            // Implement if needed
        };
        ;
        return CustomersListViewModel;
    }());
    return CustomersListViewModel;
});
//# sourceMappingURL=list.js.map