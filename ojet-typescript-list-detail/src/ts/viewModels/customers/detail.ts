/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your viewModel code goes here
 */

import { ojButton } from 'ojs/ojbutton';
import 'ojs/ojbutton';
import 'ojs/ojtoolbar';
import 'ojs/ojlabel';
import signals = require('signals');
import Customer = require('src/ts/model/Customer');
import * as ko from "knockout";

class CustomersDetailViewModel {

    backButtonAction: ojButton['onOjAction'];
    backToListSignal: signals.Signal;
    customerSelected: KnockoutObservable<Customer>;

    constructor(params: any) {
        let self = this;
        self.backToListSignal = params.backToListSignal;
        const customers = params.customers;
        const customerId = params.customerId;
        self.customerSelected =  ko.observable(customers[customerId]);
        self.backButtonAction = (event: ojButton.ojAction) => {
            this.backToListSignal.dispatch();
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
export = CustomersDetailViewModel;