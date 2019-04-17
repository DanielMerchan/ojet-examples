/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
import Composite = require('ojs/ojcomposite');
import * as view from 'text!./my-cca-view.html';
import viewModel = require('./my-cca-viewModel');
import * as metadata from 'text!./component.json';
import 'css!./my-cca-styles';

(()=> {
  let metadataObj = JSON.parse(metadata);
  Composite.register('my-cca', {
    view: view,
    viewModel: viewModel,
    metadata: metadataObj
  });
})();