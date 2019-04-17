/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(["require", "exports", "knockout", "ojs/ojrouter", "./Utils", "ojs/ojarraydataprovider", "ojs/ojresponsiveutils", "ojs/ojresponsiveknockoututils", "ojs/ojdialog", "ojs/ojtoolbar", "ojs/ojbutton", "ojs/ojmenu", "ojs/ojnavigationlist", "ojs/ojmodule-element"], function (require, exports, ko, Router, Utils, ArrayDataProvider, ResponsiveUtils, ResponsiveKnockoutUtils) {
    "use strict";
    var ControllerViewModel = /** @class */ (function () {
        function ControllerViewModel() {
            var self = this;
            self.router = Router.rootInstance;
            self.router.configure({
                'dashboard': { label: 'Dashboard', isDefault: true },
                'incidents': { label: 'Incidents' },
                'customers': { label: 'Customers', value: self.router.createChildRouter('customers').configure({
                        'list': { label: 'List', isDefault: true },
                        'detail/{id}/{edit}': { label: 'Detail' }
                    }) },
                'about': { label: 'About' }
            });
            // Media queries for repsonsive layouts
            var smQuery = ResponsiveUtils.getFrameworkQuery('sm-only');
            if (smQuery) {
                self.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
            }
            var mdQuery = ResponsiveUtils.getFrameworkQuery('md-up');
            if (mdQuery) {
                self.mdScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);
            }
            // Navigation setup
            var navData = [
                {
                    name: 'Dashboard',
                    id: 'dashboard',
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'
                },
                {
                    name: 'Incidents',
                    id: 'incidents',
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'
                },
                {
                    name: 'Customers',
                    id: 'customers',
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'
                },
                {
                    name: 'About',
                    id: 'about',
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24'
                }
            ];
            // Header
            // Application Name used in Branding Area
            self.appName = ko.observable("TypeScript Starter Template");
            // User Info used in Global Navigation area
            self.userLogin = ko.observable("john.hancock@oracle.com");
            // Dropdown menu states
            self.menuItemSelect = function (event) {
                var selectedOption = event.target;
                switch (selectedOption.value) {
                    case "about":
                        var dialog = document.getElementById('aboutDialog');
                        dialog.open();
                        break;
                    default:
                }
            };
            self.close = function () {
                var dialog = document.getElementById('aboutDialog');
                dialog.close();
            };
            // Change the router state based on selection
            self.navDataSource = new ArrayDataProvider(navData, { keyAttributes: 'id' });
            self.selectionChange = function (event) {
                var newVal = event.detail.value;
                if (newVal !== self.router.stateId()) {
                    self.router.go(newVal);
                }
            };
            // Navigation setup
            var defaultConfig = { view: [], viewModel: Object, cleanupMode: "onDisconnect" };
            self.moduleConfig = ko.observable(defaultConfig);
            Utils.resolveViewAndViewModel(self.router.moduleConfig.name(), self.moduleConfig, 'none');
            // When router state changes, load the new modules
            var currentRouterSelection = self.router.moduleConfig.name;
            currentRouterSelection.subscribe(function (name) {
                Utils.resolveViewAndViewModel(name, self.moduleConfig, 'none');
            });
            // Footer
            self.footerLinks = [
                new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
                new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
                new footerLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
                new footerLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
            ];
        }
        return ControllerViewModel;
    }());
    var footerLink = /** @class */ (function () {
        function footerLink(name, linkId, linkTarget) {
            this.name = name;
            this.linkId = linkId;
            this.linkTarget = linkTarget;
        }
        return footerLink;
    }());
    return ControllerViewModel;
});
//# sourceMappingURL=appController.js.map