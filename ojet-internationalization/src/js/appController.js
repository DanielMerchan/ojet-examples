/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojmodule-element-utils', 'utils/Languages', 'ojs/ojarraydataprovider', 'ojs/ojlistdataproviderview', 'ojs/ojmodule-element', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource',
  'ojs/ojoffcanvas', 'ojs/ojselectcombobox'],
  function(oj, ko, moduleUtils, Languages, ArrayDataProvider, ListDataProviderView) {
     function ControllerViewModel() {
      var self = this;

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

      // Localization Block!!!!
      // Initialization of the Translations
      self.initTranslations = () => {
        // Navigation Labels
        self.dashboardMenuLabel = ko.observable(oj.Translations.getTranslatedString('nav.dashboard'));
        self.incidentsMenuLabel = ko.observable(oj.Translations.getTranslatedString('nav.incidents'));
        self.customersMenuLabel = ko.observable(oj.Translations.getTranslatedString('nav.customers'));
        self.aboutMenuLabel = ko.observable(oj.Translations.getTranslatedString('nav.about'));
        // Menu Labels
        self.preferencesLabel = ko.observable(oj.Translations.getTranslatedString('menu.preferences'));
        self.laguangesLabel = ko.observable(oj.Translations.getTranslatedString('menu.languages'));
        self.helpLabel = ko.observable(oj.Translations.getTranslatedString('menu.help'));
        self.aboutLabel = ko.observable(oj.Translations.getTranslatedString('menu.about'));
        self.signOutLabel = ko.observable(oj.Translations.getTranslatedString('menu.signOut'));
        // Footer Labels
        self.aboutOracleLabel = ko.observable(oj.Translations.getTranslatedString('footer.aboutOracle'));
        self.contactUsLabel = ko.observable(oj.Translations.getTranslatedString('footer.contactUs'));
        self.legalNoticesLabel = ko.observable(oj.Translations.getTranslatedString('footer.legalNotices'));
        self.termsofUseLabel = ko.observable(oj.Translations.getTranslatedString('footer.termsOfUse'));
        self.yourPrivacyRightsLabel = ko.observable(oj.Translations.getTranslatedString('footer.yourPrivacyRights'));
        console.log("AppController Translations initiated!");
      }
      // Refresh the Translations
      self.refreshTranslations = () => {
        // Refresh Navigation Labels
        self.dashboardMenuLabel(oj.Translations.getTranslatedString('nav.dashboard'));
        self.incidentsMenuLabel(oj.Translations.getTranslatedString('nav.incidents'));
        self.customersMenuLabel(oj.Translations.getTranslatedString('nav.customers'));
        self.aboutMenuLabel(oj.Translations.getTranslatedString('nav.about'));
        // Refresh Labels
        self.preferencesLabel(oj.Translations.getTranslatedString('menu.preferences'));
        self.laguangesLabel(oj.Translations.getTranslatedString('menu.languages'));
        self.helpLabel(oj.Translations.getTranslatedString('menu.help'));
        self.aboutLabel(oj.Translations.getTranslatedString('menu.about'));
        self.signOutLabel(oj.Translations.getTranslatedString('menu.signOut'));
        // Refreshc Labels
        self.aboutOracleLabel(oj.Translations.getTranslatedString('footer.aboutOracle'));
        self.contactUsLabel(oj.Translations.getTranslatedString('footer.contactUs'));
        self.legalNoticesLabel(oj.Translations.getTranslatedString('footer.legalNotices'));
        self.termsofUseLabel(oj.Translations.getTranslatedString('footer.termsOfUse'));
        self.yourPrivacyRightsLabel(oj.Translations.getTranslatedString('footer.yourPrivacyRights'));
        console.log("AppController Translations refreshed");
        console.log(self.aboutLabel);
      }
      self.initTranslations();
    
      // Lang Combobox
      self.currentLanguage = ko.observable(Languages.getCurrentLocale());
      const mapLangFields = item => {
        const data = item['data'];
        let mappedItem = {};
        mappedItem['data'] = {};
        mappedItem['data']['label'] = data['name'];
        mappedItem['data']['value'] = data['locale'];
        mappedItem['metadata'] = {'key': data['locale']};
        return mappedItem;
      }; 
      const langMapping = {'mapFields': mapLangFields};
      self.arraySupportedLanguages = new ArrayDataProvider(Languages.supportedLanguages, {keyAttributes: 'locale'});
      self.languageDataProvider = new ListDataProviderView(self.arraySupportedLanguages, {'dataMapping': langMapping});
      
      // Change Language
      self.setLangAction = event => {    // Change Language Event
        const newLocale = event.target.value;
        Languages.setLocale(newLocale, self.refreshTranslations);
      }

       // Router setup
       self.router = oj.Router.rootInstance;
       self.router.configure({
         'dashboard': {label: 'Dashboard', isDefault: true},
         'incidents': {label: 'Incidents'},
         'customers': {label: 'Customers'},
         'about': {label: 'About'}
       });
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

      self.moduleConfig = ko.observable({'view':[], 'viewModel':null});

      self.loadModule = function() {
        ko.computed(function() {
          var name = self.router.moduleConfig.name();
          var viewPath = 'views/' + name + '.html';
          var modelPath = 'viewModels/' + name;
          var masterPromise = Promise.all([
            moduleUtils.createView({'viewPath':viewPath}),
            moduleUtils.createViewModel({'viewModelPath':modelPath})
          ]);
          masterPromise.then(
            function(values){
              self.moduleConfig({'view':values[0],'viewModel':values[1]});
            }
          );
        });
      };

      // Navigation setup
      const navData = [
      {name: self.dashboardMenuLabel, id: 'dashboard',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
      {name: self.incidentsMenuLabel, id: 'incidents',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'},
      {name: self.customersMenuLabel, id: 'customers',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'},
      {name: self.aboutMenuLabel, id: 'about',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24'}
      ];
      self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});

      // Drawer
      // Close offcanvas on medium and larger screens
      self.mdScreen.subscribe(function() {oj.OffcanvasUtils.close(self.drawerParams);});
      self.drawerParams = {
        displayMode: 'push',
        selector: '#navDrawer',
        content: '#pageContent'
      };
      // Called by navigation drawer toggle button and after selection of nav drawer item
      self.toggleDrawer = function() {
        return oj.OffcanvasUtils.toggle(self.drawerParams);
      }
      // Add a close listener so we can move focus back to the toggle button when the drawer closes
      $("#navDrawer").on("ojclose", function() { $('#drawerToggleButton').focus(); });

      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("OJET - Internationalization Example");
      // User Info used in Global Navigation area
      self.userLogin = ko.observable("daniel.merchan@magicpigeon.com");

      // Footer
      function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }
      self.footerLinks = ko.observableArray([
        new footerLink(self.aboutOracleLabel, 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
        new footerLink(self.contactUsLabel, 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
        new footerLink(self.legalNoticesLabel, 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
        new footerLink(self.termsofUseLabel, 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
        new footerLink(self.yourPrivacyRightsLabel, 'yourPrivacyRights', 'http://www.oracle.com/us/legal/privacy/index.html')
      ]);
     }

     return new ControllerViewModel();
  }
);
