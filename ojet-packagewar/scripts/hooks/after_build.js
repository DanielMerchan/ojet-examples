/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/

'use strict';

const path = require('path');
const grunt = require('grunt');

module.exports = function (configObj) {
  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'scripts/grunt/config'),
    data: {
      appname: path.basename(process.cwd()),  // same as project directory name, accessible with '<%= appname %>'
      appdir: 'web',  // accessible with '<%= appdir %>'
      distdir: 'dist'  // accessible with '<%= distdir %>'
    }
  });

  return new Promise((resolve, reject) => {
    console.log("Running after_build hook.");
    grunt.tasks(['war']);
    resolve();
  });
};
