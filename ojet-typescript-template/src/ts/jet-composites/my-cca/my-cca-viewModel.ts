/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
import * as ko from "knockout";

import {ViewModel, ViewModelContext, PropertyChangedContext, Metadata} from 'ojs/ojcomposite';
import Context = require('ojs/ojcontext');
import * as AppResource from 'ojL10n!./resources/nls/my-cca-strings';

/**
 * create a type with all the properties of the CCA
 * This is mostly the same information you have in your component.json
 * But make it more accurate and strongly typed than the component.json
 * so that you can leverae the type-strictness when dealing with your own
 * properties in the viewModel
 * This is optional. If you do not want strict typechecking for your CCA, you can ignore this
 * and the definitions will assume the type to be any. And you can remove all the parameterizations in this 
 * file where we have used ExampleComponentProperties. But we strongly recommend you to define this type and 
 * use typechecking to avoid runtime errors.
 */
type ExampleComponentProperties = {
  'customTitle': string,
  'help' : {
    definition: string
  }
}

type ResourceType = {[key:string]: ResourceType|string};

class ExampleComponentModel implements ViewModel<ExampleComponentProperties>{

    busyResolve: (() => void);
    composite: Element;
    messageText: KnockoutObservable<string>;
    properties: ExampleComponentProperties;
    res: ResourceType;

    constructor(context: ViewModelContext<ExampleComponentProperties>){
        
        //do any initialization here
        this.properties = context.properties;
        this.composite = context.element;

        //Example observable
        this.messageText = ko.observable('Hello from Example Component');
        

        //accessing your resource strings.
        this.res = AppResource['my-cca'];
        let val = this.res['sampleString']

        //incase you want to access any of your properties and play with it
        //this will be strictly typechecked. Remove this line if you dont need it
        let test = this.properties.customTitle;
    }

    //Lifecycle methods - implement if necessary. Else comment them out
    
    activated = (context: ViewModelContext<ExampleComponentProperties>) => {
      //do all the async or startup stuff you want to do here
      let busyContext = Context.getContext(context.element).getBusyContext();
      var options = {"description": "CCA Startup - Waiting for data"};
      this.busyResolve = busyContext.addBusyState(options);

      //Once all startup and async activities have finished, relocate if there are any async activities
      this.busyResolve();
    }

    connected = (context: ViewModelContext<ExampleComponentProperties>) => {
    }

    bindingsApplied = (context: ViewModelContext<ExampleComponentProperties>) => {
    }

    propertyChanged = (context: PropertyChangedContext<ExampleComponentProperties>) => {
        // This shows how to leverage type check on the PropertyChangeContext
        // All the possible values and its type information is derived from ExampleComponentProperties
        let propName = context.property;
        if(propName === 'help'){
          let value = context.value as ExampleComponentProperties[typeof propName];
          value = {definition: 'h'}; // value is guaranteed to be the object.
        }
        else if(propName === 'customTitle'){
          let value = context.value as ExampleComponentProperties[typeof propName];
          value = 'k'; //value is guaranteed to be a string here
        }

        //subproperties
        if(context.subproperty){
          let subPropName = context.subproperty.path;
          if(subPropName === 'help.definition'){
            let value = context.subproperty.value as ExampleComponentProperties['help']['definition'];
          }
        } 
    }

    disconnected = <T extends ExampleComponentProperties, K extends keyof T>(elemen: Element) => {
    }
};
export = ExampleComponentModel;