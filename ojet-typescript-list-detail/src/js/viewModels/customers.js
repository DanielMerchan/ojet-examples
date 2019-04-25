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
        /**
         * Default Constructor of the Customers View Model
         * It is used as a container / wrapper of the List / Detail Modules
         */
        function CustomersViewModel() {
            var self = this;
            // Router
            self.router = Router.rootInstance;
            // Parameters to be passed to the child modules
            self.customerSelectedSignal = new signals.Signal();
            self.backToListSignal = new signals.Signal();
            // Default Module Configuration
            var defaultConfig = { view: [], viewModel: Object, cleanupMode: "onDisconnect" };
            self.moduleConfig = ko.observable(defaultConfig);
            // Build default Child Module Configuration based on the Child Router State
            self.custChildRouter = self.router.getCurrentChildRouter();
            self.loadCustomerModule(self.custChildRouter.moduleConfig.name());
            // Signals Listeners
            // Listen when a customer has been selected in the 'list' module
            self.customerSelectedSignal.add(function (customerId) {
                self.custChildRouter.go("detail/" + customerId[0]).then(function (status) {
                    if (status.hasChanged) {
                        self.loadCustomerModule(self.custChildRouter.moduleConfig.name());
                    }
                });
            });
            // Listen when 'back to list' is clicked in a 'detail' module
            self.backToListSignal.add(function () {
                self.custChildRouter.go("list").then(function (status) {
                    if (status.hasChanged) {
                        self.loadCustomerModule(self.custChildRouter.moduleConfig.name());
                    }
                });
            });
        }
        // Static Methods
        CustomersViewModel.initializeCustomers = function () {
            CustomersViewModel.customers = [{ id: 0, name: 'Paco', age: 22 }, { id: 1, name: 'Eva', age: 30 }];
        };
        // Custom Functions
        CustomersViewModel.prototype.loadCustomerModule = function (name) {
            var data = {};
            if (name === 'detail') {
                var mc = this.custChildRouter.observableModuleConfig();
                var customerId = mc.params['ojRouter']['parameters']['id']();
                data = { 'backToListSignal': this.backToListSignal, 'customers': CustomersViewModel.customers, 'customerId': customerId };
            }
            else {
                data = { 'customerSelectedSignal': this.customerSelectedSignal, 'customers': CustomersViewModel.customers };
            }
            Utils.resolveViewAndViewModel(this.router.moduleConfig.name() + '/' + name, this.moduleConfig, 'none', data);
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
            var self = this;
            self.customerSelectedSignal.removeAll();
            self.backToListSignal.removeAll();
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