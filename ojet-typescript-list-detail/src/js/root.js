define(["require", "exports", "knockout", "./appController", "ojs/ojrouter", "ojs/ojlogger", "ojs/ojknockout"], function (require, exports, ko, RootViewModel, Router, Logger) {
    "use strict";
    var Root = /** @class */ (function () {
        function Root() {
            var self = this;
            self.router = Router.rootInstance;
            var rootVM = new RootViewModel();
            Router.defaults['urlAdapter'] = new Router.urlParamAdapter();
            Router.sync().then(function () {
                // bind your ViewModel for the content of the whole page body.
                ko.applyBindings(rootVM, document.getElementById('globalBody'));
            }, function (error) {
                Logger.error('Error in root start: ' + error.message);
            });
        }
        return Root;
    }());
    return Root;
});
//# sourceMappingURL=root.js.map