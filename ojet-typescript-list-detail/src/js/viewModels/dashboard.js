define(["require", "exports", "knockout"], function (require, exports, ko) {
    "use strict";
    var DashboardViewModel = /** @class */ (function () {
        function DashboardViewModel() {
            var self = this;
            self.something = ko.observable("This parapgraph uses content from it's own 'DashboardViewModel' Class. The module is found in the /ts folder");
            /*
             * Your viewModel code goes here
             */
        }
        /**
         * Optional ViewModel method invoked after the View is inserted into the
         * document DOM.  The application can put logic that requires the DOM being
         * attached here.
         * This method might be called multiple times - after the View is created
         * and inserted into the DOM and after the View is reconnected
         * after being disconnected.
         */
        DashboardViewModel.prototype.connected = function () {
            // Implement if needed
        };
        ;
        /**
         * Optional ViewModel method invoked after the View is disconnected from the DOM.
         */
        DashboardViewModel.prototype.disconnected = function () {
            // Implement if needed
        };
        ;
        /**
         * Optional ViewModel method invoked after transition to the new View is complete.
         * That includes any possible animation between the old and the new View.
         */
        DashboardViewModel.prototype.transitionCompleted = function () {
            // Implement if needed
        };
        ;
        return DashboardViewModel;
    }());
    return DashboardViewModel;
});
//# sourceMappingURL=dashboard.js.map