define(["require", "exports", "knockout", "./appController", "ojs/ojrouter", "ojs/ojlogger", "ojs/ojknockout"], function (require, exports, ko, RootViewModel, Router, Logger) {
    "use strict";
    var Root = /** @class */ (function () {
        function Root() {
            var self = this;
            self.router = Router.rootInstance;
            self.router.configure({
                'dashboard': { label: 'Dashboard', isDefault: true },
                'incidents': { label: 'Incidents' },
                'customers': { label: 'Customers' },
                'about': { label: 'About' }
            });
            Router.defaults['urlAdapter'] = new Router.urlParamAdapter();
            Router.sync().then(function () {
                // bind your ViewModel for the content of the whole page body.
                ko.applyBindings(new RootViewModel(), document.getElementById('globalBody'));
            }, function (error) {
                Logger.error('Error in root start: ' + error.message);
            });
        }
        return Root;
    }());
    return Root;
});
//# sourceMappingURL=root.js.map