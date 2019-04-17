/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your viewModel code goes here
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    var CustomersViewModel = /** @class */ (function () {
        function CustomersViewModel() {
            var self = this;
        }
        /**
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
    return CustomersViewModel;
});
//# sourceMappingURL=customers.js.map