/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your viewModel code goes here
 */

import * as ko from "knockout";
import { ojModule } from 'ojs/ojmodule-element';
import Utils = require('../Utils');
import Router = require('ojs/ojrouter');
import signals = require("signals");
import "ojs/ojknockout";
import Customer = require('../model/Customer');

/**
 * CustomersViewModel module which uses two auxiliar modules for list / detail visualization of Customers
 * @author Daniel Merchan Garcia
 * @version 6.2.0
 */
class CustomersViewModel {

    // Attributes
    router: Router;
    custChildRouter: Router;
    moduleConfig: KnockoutObservable<ojModule['config']>;
    customerSelectedSignal: signals.Signal;
    backToListSignal: signals.Signal;
    static customers: Array<Customer>;
    currentChildSelection: KnockoutObservable<string>;

    // Static Methods
    static initializeCustomers() {
        CustomersViewModel.customers = [{ id: 0, name: 'Paco', age: 22 }, { id: 1, name: 'Eva', age: 30 }];
    }

    /**
     * Default Constructor of the Customers View Model
     * It is used as a container / wrapper of the List / Detail Modules
     */
    constructor() {
        let self = this;
        // Router
        self.router = Router.rootInstance;
        // Parameters to be passed to the child modules
        self.customerSelectedSignal = new signals.Signal();
        self.backToListSignal = new signals.Signal();
        // Default Module Configuration
        let defaultConfig: ojModule['config'] = { view: [], viewModel: Object, cleanupMode: "onDisconnect" };
        self.moduleConfig = ko.observable(defaultConfig);
        // Build default Child Module Configuration based on the Child Router State
        self.custChildRouter = self.router.getCurrentChildRouter() as Router;
        self.loadCustomerModule(self.custChildRouter.moduleConfig.name());

        
        // Signals Listeners
        // Listen when a customer has been selected in the 'list' module
        self.customerSelectedSignal.add(customerId => {
            self.custChildRouter.go(`detail/${customerId[0]}`).then(status => {
                if (status.hasChanged) {
                    self.loadCustomerModule(self.custChildRouter.moduleConfig.name());
                }

            });
        });

        // Listen when 'back to list' is clicked in a 'detail' module
        self.backToListSignal.add(() => {
            self.custChildRouter.go(`list`).then(status => {
                if (status.hasChanged) {
                    self.loadCustomerModule(self.custChildRouter.moduleConfig.name());
                }
            });
        })
    }

    // Custom Functions
    private loadCustomerModule(name: string): void {
        let data = {};
        if (name === 'detail') {
            const mc = this.custChildRouter.observableModuleConfig();
            const customerId = mc.params['ojRouter']['parameters']['id']();
            data = { 'backToListSignal': this.backToListSignal, 'customers': CustomersViewModel.customers, 'customerId': customerId };
        } else {
            data = { 'customerSelectedSignal': this.customerSelectedSignal, 'customers': CustomersViewModel.customers };
        }
        Utils.resolveViewAndViewModel(this.router.moduleConfig.name() + '/' + name, this.moduleConfig, 'none', data);
    }

    /*
     * Optional ViewModel method invoked after the View is inserted into the
     * document DOM.  The application can put logic that requires the DOM being
     * attached here. 
     * This method might be called multiple times - after the View is created 
     * and inserted into the DOM and after the View is reconnected 
     * after being disconnected.
     */
    connected(): void {
        // Implement if needed
    };

    /**
     * Optional ViewModel method invoked after the View is disconnected from the DOM.
     */
    disconnected(): void {
        let self = this;
        self.customerSelectedSignal.removeAll();
        self.backToListSignal.removeAll();
    };

    /**
     * Optional ViewModel method invoked after transition to the new View is complete.
     * That includes any possible animation between the old and the new View.
     */
    transitionCompleted(): void {
        // Implement if needed
    };
}

// Initialize static content
CustomersViewModel.initializeCustomers();

export = CustomersViewModel;