import * as ko from "knockout";
import "ojs/ojknockout";
import RootViewModel = require ('./appController');
import Router = require('ojs/ojrouter');
import Logger = require('ojs/ojlogger');

class Root {
    router: Router;

    constructor() {
        let self = this;
        self.router = Router.rootInstance;
        const rootVM = new RootViewModel();
        Router.defaults['urlAdapter'] = new Router.urlParamAdapter();
        Router.sync().then(
            function() {
                // bind your ViewModel for the content of the whole page body.
                ko.applyBindings(rootVM, document.getElementById('globalBody'));
            },
            function(error) {
                Logger.error('Error in root start: ' + error.message);
            }
        );
    }
}

export = Root;