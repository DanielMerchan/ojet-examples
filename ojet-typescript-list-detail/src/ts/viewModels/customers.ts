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

    // 
    router: Router;
    moduleConfig: KnockoutObservable<ojModule['config']>;
    customerSelectedSignal: signals.Signal;
    backToListSignal: signals.Signal;
    static customers: Array<Customer>;

    static initializeCustomers() {
        console.log("init");
        CustomersViewModel.customers = [{id: 0, name: 'Paco', age: 22 },{id: 1, name: 'Eva', age:30}];
    }

    constructor() {
        let self = this;
        // Router
        self.router = Router.rootInstance;
        // Parameters to be passed to the child modules
        self.customerSelectedSignal = new signals.Signal(); // -> For communicating modules
        self.backToListSignal = new signals.Signal();

        let defaultConfig: ojModule['config'] = { view: [], viewModel: Object, cleanupMode: "onDisconnect" };
        self.moduleConfig = ko.observable(defaultConfig);
        // Default module reflected in URL
        self.router.go(`customers/list`);
        Utils.resolveViewAndViewModel('customers/list', self.moduleConfig, 'none', { 'customerSelectedSignal': self.customerSelectedSignal, 'customers': CustomersViewModel.customers});
        
        
        self.customerSelectedSignal.add(customerId => {
            self.router.go(`customers/detail/${customerId}`);
            Utils.resolveViewAndViewModel('customers/detail', self.moduleConfig, 'none', { 'backToListSignal': self.backToListSignal, 'customers': CustomersViewModel.customers, 'customerId': customerId[0]});
        });

        self.backToListSignal.add(() => {
            self.router.go(`customers/list`);
            Utils.resolveViewAndViewModel('customers/list', self.moduleConfig, 'none', { 'customerSelectedSignal': self.customerSelectedSignal, 'customers': CustomersViewModel.customers});
        })
        
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
        // Implement if needed
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