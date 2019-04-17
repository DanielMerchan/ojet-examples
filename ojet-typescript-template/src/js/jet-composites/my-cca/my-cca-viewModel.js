define(["require", "exports", "knockout", "ojs/ojcontext", "ojL10n!./resources/nls/my-cca-strings"], function (require, exports, ko, Context, AppResource) {
    "use strict";
    var ExampleComponentModel = /** @class */ (function () {
        function ExampleComponentModel(context) {
            var _this = this;
            //Lifecycle methods - implement if necessary. Else comment them out
            this.activated = function (context) {
                //do all the async or startup stuff you want to do here
                var busyContext = Context.getContext(context.element).getBusyContext();
                var options = { "description": "CCA Startup - Waiting for data" };
                _this.busyResolve = busyContext.addBusyState(options);
                //Once all startup and async activities have finished, relocate if there are any async activities
                _this.busyResolve();
            };
            this.connected = function (context) {
            };
            this.bindingsApplied = function (context) {
            };
            this.propertyChanged = function (context) {
                // This shows how to leverage type check on the PropertyChangeContext
                // All the possible values and its type information is derived from ExampleComponentProperties
                var propName = context.property;
                if (propName === 'help') {
                    var value = context.value;
                    value = { definition: 'h' }; // value is guaranteed to be the object.
                }
                else if (propName === 'customTitle') {
                    var value = context.value;
                    value = 'k'; //value is guaranteed to be a string here
                }
                //subproperties
                if (context.subproperty) {
                    var subPropName = context.subproperty.path;
                    if (subPropName === 'help.definition') {
                        var value = context.subproperty.value;
                    }
                }
            };
            this.disconnected = function (elemen) {
            };
            //do any initialization here
            this.properties = context.properties;
            this.composite = context.element;
            //Example observable
            this.messageText = ko.observable('Hello from Example Component');
            //accessing your resource strings.
            this.res = AppResource['my-cca'];
            var val = this.res['sampleString'];
            //incase you want to access any of your properties and play with it
            //this will be strictly typechecked. Remove this line if you dont need it
            var test = this.properties.customTitle;
        }
        return ExampleComponentModel;
    }());
    ;
    return ExampleComponentModel;
});
//# sourceMappingURL=my-cca-viewModel.js.map