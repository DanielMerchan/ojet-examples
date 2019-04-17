/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your viewModel code goes here
 */
define(["require", "exports", "knockout", "../Utils", "ojs/ojrouter", "signals", "ojs/ojknockout"], function (require, exports, ko, Utils, Router, signals) {
    "use strict";
    /**
     * CustomersViewModel module which uses two auxiliar modules for list / detail visualization of Customers
     * @author Daniel Merchan Garcia
     * @version 6.2.0
     */
    var CustomersViewModel = /** @class */ (function () {
        function CustomersViewModel() {
            var self = this;
            // Router
            self.router = Router.rootInstance;
            // Parameters to be passed to the child modules
            self.customerSelectedSignal = new signals.Signal(); // -> For communicating modules
            self.backToListSignal = new signals.Signal();
            var defaultConfig = { view: [], viewModel: Object, cleanupMode: "onDisconnect" };
            self.moduleConfig = ko.observable(defaultConfig);
            // Default module reflected in URL
            self.router.go("customers/list");
            Utils.resolveViewAndViewModel('customers/list', self.moduleConfig, 'none', { 'customerSelectedSignal': self.customerSelectedSignal, 'customers': CustomersViewModel.customers });
            self.customerSelectedSignal.add(function (customerId) {
                self.router.go("customers/detail/" + customerId);
                Utils.resolveViewAndViewModel('customers/detail', self.moduleConfig, 'none', { 'backToListSignal': self.backToListSignal, 'customers': CustomersViewModel.customers, 'customerId': customerId[0] });
            });
            self.backToListSignal.add(function () {
                self.router.go("customers/list");
                Utils.resolveViewAndViewModel('customers/list', self.moduleConfig, 'none', { 'customerSelectedSignal': self.customerSelectedSignal, 'customers': CustomersViewModel.customers });
            });
        }
        CustomersViewModel.initializeCustomers = function () {
            console.log("init");
            CustomersViewModel.customers = [{ id: 0, name: 'Paco', age: 22 }, { id: 1, name: 'Eva', age: 30 }];
        };
        /*
         * Optional ViewModel method invoked after the View is inserted into the
         * document DOM.  The application can put logic that requires the DOM being
         * attached here.
         * This method might be called multiple times - after the View is created
         * and inserted into the DOM and after the View is reconnected
         * after being disconnected.
         */
        CustomersViewModel.prototype.connected = function () {
            // Implement if needed
        };
        ;
        /**
         * Optional ViewModel method invoked after the View is disconnected from the DOM.
         */
        CustomersViewModel.prototype.disconnected = function () {
            // Implement if needed
        };
        ;
        /**
         * Optional ViewModel method invoked after transition to the new View is complete.
         * That includes any possible animation between the old and the new View.
         */
        CustomersViewModel.prototype.transitionCompleted = function () {
            // Implement if needed
        };
        ;
        return CustomersViewModel;
    }());
    // Initialize static content
    CustomersViewModel.initializeCustomers();
    return CustomersViewModel;
});
//# sourceMappingURL=customers.js.map