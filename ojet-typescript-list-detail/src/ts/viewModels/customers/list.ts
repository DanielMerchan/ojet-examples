/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your viewModel code goes here
 */

import signals = require('signals');
import Customer = require('../../model/Customer');
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ojListView } from 'ojs/ojlistview';

import 'ojs/ojlistview';

class CustomersListViewModel {

    customerSelectedSignal: signals.Signal;
    customers: Array<Customer>;
    customersArrayDataProvider: ArrayDataProvider<Array<Customer>,object>;
    onSelectCustomer: ojListView<string,object>['onSelectionChanged'];

    constructor(params: any) {
        console.log('constructor');
        let self = this;
        self.customerSelectedSignal = params.customerSelectedSignal;
        self.customers = params.customers;
        self.customersArrayDataProvider = new ArrayDataProvider(self.customers, {keyAttributes: 'id'});
        self.onSelectCustomer = event => {
            self.customerSelectedSignal.dispatch(event.detail.value);
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
export = CustomersListViewModel;