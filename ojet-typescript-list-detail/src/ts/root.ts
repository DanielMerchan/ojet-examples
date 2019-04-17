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
        self.router.configure({
            'dashboard': { label: 'Dashboard', isDefault: true },
            'incidents': { label: 'Incidents' },
            'customers': { label: 'Customers' },
            'about': { label: 'About' }
        });
        Router.defaults['urlAdapter'] = new Router.urlParamAdapter();
        Router.sync().then(
            function() {
                // bind your ViewModel for the content of the whole page body.
                ko.applyBindings(new RootViewModel(), document.getElementById('globalBody'));
            },
            function(error) {
                Logger.error('Error in root start: ' + error.message);
            }
        );
    }
}

export = Root;