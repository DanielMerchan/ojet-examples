/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojmodule-element-utils', 'ojs/ojmodule-element', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource',
  'ojs/ojoffcanvas', 'ojs/ojjsontreedatasource'],
  function (oj, ko, moduleUtils) {
    function ControllerViewModel() {
      var self = this;

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

      // Router setup
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
            'home': {
              label: 'Home',
              isDefault: true
            },
            'search-organisation': {
              label: 'Search Organisation'
            }

          })
        }
      });
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

      self.moduleConfig = ko.observable({ 'view': [], 'viewModel': null });

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

      // Auxiliar function to return the Router Structure as JSON
      const buildNavListData = (router, parentId) => {
        var jsonData = [];

        router.states.forEach(function (state) {
          var hrefurl, childrenData = [];

          if (state.value instanceof oj.Router) {
            childrenData = buildNavListData(state.value, state.id);
          }

          if (parentId) {
            hrefurl = "?root=" + parentId + "&" + router.name + "=" + state.id;
          }
          else {
            hrefurl = "?root=" + state.id;
          }

          jsonData.push(
            {
              'attr':
              {
                // The id is the compound state to transition to this state
                id: parentId ? parentId + '/' + state.id : state.id,
                label: state.label,
                href: hrefurl
              },
              'children': childrenData
            });
        });
        return jsonData;
      }

      // const buildNavListData = (router, parentId) => {
      //   var jsonData = [];

      //   router.states.forEach(function (state) {
      //     var hrefurl, childrenData = [];

      //     if (state.value instanceof oj.Router) {
      //       childrenData = buildNavListData(state.value, state.id);
      //     }

      //     if (parentId) {
      //       hrefurl = "?root=" + parentId + "&" + router.name + "=" + state.id;
      //     }
      //     else {
      //       hrefurl = "?root=" + state.id;
      //     }

      //     jsonData.push(
      //       {
      //         // The id is the compound state to transition to this state
      //         id: parentId ? parentId + '/' + state.id : state.id,
      //         label: state.label,
      //         iconStyleClass: 'oj-navigationlist-item-icon demo-home-icon-24 demo-icon-font-24',
      //         href: hrefurl,
      //         children: childrenData
      //       });
      //   });
      //   return jsonData;
      // }


      // // Navigation setup
      // var navData = [
      //   {
      //     name: 'Home', id: 'home',
      //     iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'
      //   },
      //   {
      //     name: 'HR', id: 'hr',
      //     iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'
      //   },
      //   {
      //     name: 'Sales', id: 'sales',
      //     iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'
      //   }
      // ];
      // const navData = buildNavListData(self.router,self.router.parentId);
      // self.navDataSource = new oj.ArrayTableDataSource(navData, { idAttribute: 'id' });
      const navData = buildNavListData(self.router, self.router.parentId);
      self.navDataSource = new oj.JsonTreeDataSource(navData);

      self.selectHandler = event => {
        console.log("LOLOLO");
        console.log(event.target.id);
        event.preventDefault();
        // Invoke go() with the selected item.
        self.router.go(event.detail.key);
      }
      self.selection = ko.computed(() => {
        var currentState = self.router.currentState(),
          childRouter, selection, data;
        if (currentState && currentState.id) {
          childRouter = currentState.value;
          if (childRouter) {
            selection = childRouter.stateId();
          }

          if (selection) {
            selection = currentState.id + '/' + selection;
          }
          else {
            selection = currentState.id;
          }
        }

        return selection;
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
      self.appName = ko.observable("App Name");
      // User Info used in Global Navigation area
      self.userLogin = ko.observable("john.hancock@oracle.com");

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
