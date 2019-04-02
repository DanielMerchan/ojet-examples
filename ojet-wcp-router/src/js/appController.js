/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'ojs/ojkeyset', 'knockout', 'ojs/ojmodule-element-utils', 'ojs/ojmodule-element', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource',
  'ojs/ojoffcanvas', 'ojs/ojjsontreedatasource',],
  function (oj, keySet, ko, moduleUtils) {
    function ControllerViewModel() {
      var self = this;

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

      // 1. Router Setup. Calculates and contains all the links the user has access to.
      // Improvement: It can only contain the Portals links and calculate the rest of the links "lazily" on demand when a top navigation item is clicked.
      // This is just Demo Purpose
      self.router = oj.Router.rootInstance;
      self.router.configure({
        'home': {
          label: 'Home',
          isDefault: true
        },
        'hr': {
          label: 'HR',
          value: self.router.createChildRouter('hrportal', 'hr').configure({
            'home': {
              label: 'Home',
              isDefault: true
            },
            'employees': {
              label: 'Employees'
            }

          })
        },
        'sales': {
          label: 'Sales',
          value: self.router.createChildRouter('salesportal', 'sales').configure({
            'home': {ff
              label: 'Home',
              isDefault: true
            },
            'search-organisation': {
              label: 'Search Organisation'
            }

          })
        }
      });

      // 2. Keep the usage of URL parameters to determine View and View Model
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();
      self.moduleConfig = ko.observable({ 'view': [], 'viewModel': null });

      // 3. Modified version of the "loadModule" called from main.js.
      // It takes into consideration the new folder structure for placing Portal items
      self.loadModule = function () {
        ko.computed(function () {
          var portalName = self.router.moduleConfig.name();
          var name = portalName;
          if (portalName && portalName !== 'home') {
            name = portalName + '/' + self.router.getCurrentChildRouter().moduleConfig.name();
          }
          var viewPath = 'views/' + name + '.html';
          var modelPath = 'viewModels/' + name;
          console.log(`name: ${name} viewPath: ${viewPath} modelPath: ${modelPath}`);
          var masterPromise = Promise.all([
            moduleUtils.createView({ 'viewPath': viewPath }),
            moduleUtils.createViewModel({ 'viewModelPath': modelPath })
          ]);
          masterPromise.then(
            function (values) {
              self.moduleConfig({ 'view': values[0], 'viewModel': values[1] });
            }
          );
        });
      };

      // 4. Auxiliar function to construct a JSON Tree Structure of the hole navigation
      const buildJsonNavTreeData = (router, parentId) => {
        let data = [];

        router.states.forEach(state => {
          let childrenData = [];

          if (state.value instanceof oj.Router) {
            childrenData = buildJsonNavTreeData(state.value, state.id);
          }

          let jsonData = {};
          jsonData.attr = {
            id: parentId ? parentId + '/' + state.id : state.id,
            label: state.label
          }

          if (childrenData.length > 0) {
            jsonData.children = childrenData;
          }

          data.push(jsonData);

        });
        return data;
      }


      // 5 Navigation Model in:
      // JSON plain format that can be iterated by iterators
      // JsonTreeDataSource if intended to be fully rendered in a vertical menu (like the Drawer)
      self.navTreeData = buildJsonNavTreeData(self.router, self.router.parentId);
      self.navJsonDataSource = new oj.JsonTreeDataSource(self.navTreeData);
      
      // 6. Only Current Childs for the selected portal
      // Note it is unnecesary JsonTreeDataSource as we do not have more childs,
      self.navJsonChildDataSource = ko.computed(() => {
        let currentState = self.router.currentState(), childRouter;
        let navJsonChildDataSource = [];
        if (currentState && currentState.id) {
          childRouter = currentState.value;
        }
        if (childRouter) {
          childRouter.states.forEach(state => {
            let jsonData = {};
            jsonData.attr = {
              id: (currentState.id + '/' + state.id),
              label: state.label
            }

            navJsonChildDataSource.push(jsonData);
          });
        }
        return  new oj.JsonTreeDataSource(navJsonChildDataSource);
      }, self.router);

      // 7. Selection handler to navigate to the specific Module
      self.selectHandler = event => {
        if (event.detail.originalEvent) {
          event.preventDefault();
          // Invoke go() with the selected item.
          self.router.go(event.detail.key);
        }
      }

      // 8. Holds the current portal selected
      self.portalSelection = ko.computed(() => {
        var currentState = self.router.currentState(), portalSelection;
        if (currentState && currentState.id) {
          portalSelection = currentState.id;
        }
        return portalSelection;
      }, self.router);


      // 9. Calculates the current node selected
      self.currentSelection = ko.computed(() => {
        let currentState = self.router.currentState(),
          childRouter, currentSelection;
        if (currentState && currentState.id) {
          childRouter = currentState.value;
          if (childRouter) {
            currentSelection = childRouter.stateId();
          }
          if (currentSelection) {
            currentSelection = currentState.id + '/' + currentSelection;
          }
          else {
            currentSelection = currentState.id;
          }
        }
        return currentSelection;
      }, self.router);

      
      // 10. Calculates if the current node is leaf or not to be clicked or not in Vertical and NavDrawer
      self.leafOnly = context => {
        return context['leaf'];
      }

      // 11. Calculates which is the Node to be expanded by default in Vertical and NavDrawer
      self.expanded = ko.computed(() => {
        var currentState = self.router.currentState(), childRouter, expanded;
        if (currentState && currentState.id) {
          childRouter = currentState.value;
        }
        if (childRouter) {
          expanded = currentState.id;
        }
        return new keySet.ExpandedKeySet([expanded]);
      }, self.router);

      // Drawer
      // Close offcanvas on medium and larger screens
      self.mdScreen.subscribe(function () { oj.OffcanvasUtils.close(self.drawerParams); });
      self.drawerParams = {
        displayMode: 'push',
        selector: '#navDrawer',
        content: '#pageContent'
      };
      // Called by navigation drawer toggle button and after selection of nav drawer item
      self.toggleDrawer = function () {
        return oj.OffcanvasUtils.toggle(self.drawerParams);
      }
      // Add a close listener so we can move focus back to the toggle button when the drawer closes
      $("#navDrawer").on("ojclose", function () { $('#drawerToggleButton').focus(); });

      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("Oracle WebCenter Portal to Oracle JET");
      // User Info used in Global Navigation area
      self.userLogin = ko.observable("daniel.merchan");

      // Footer
      function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }
      self.footerLinks = ko.observableArray([
        new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
        new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
        new footerLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
        new footerLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
        new footerLink('Your Privacy Rights', 'yourPrivacyRights', 'http://www.oracle.com/us/legal/privacy/index.html')
      ]);
    }

    return new ControllerViewModel();
  }
);
