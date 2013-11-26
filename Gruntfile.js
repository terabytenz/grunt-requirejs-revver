/*
 * grunt-requirejs-revver
 * https://github.com/patocallaghan/grunt-requirejs-revver
 *
 * Copyright (c) 2013 Pat O'Callaghan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= mochaTest.files %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['test/tmp'],
    },

    revver: {
      build: {
        files: {
          src: ['scripts/dist/**/*.js', '!scripts/dist/revved.js'],
          dest: 'scripts/dist/revved.js'
        },
        template: {
          intro: 'requirejs.config( { \n\tpaths: {',
          outro: '\n\t}\n});'
        },
        options: {
          paths: {
            app: '../app',
            common: '../common',
            async: 'requirejs-plugins/async',
            goog: 'requirejs-plugins/goog',
            propertyParser: 'requirejs-plugins/propertyParser',
            implementations: 'requirejs-plugins/amd-feature/dynamic',
            feature: 'requirejs-plugins/feature',
            jquery: 'jquery-1.9.1',
            jqueryui: 'jquery-ui-1.10.2.custom.min',
            easing: 'jquery.easing.1.3',
            throttledebounce: 'jquery.ba-throttle-debounce.min',
            pubsub: 'jquery.ba-tinypubsub',
            lazyload: 'jquery.lazyload.1.8.2',
            lazyscroll: 'jquery.lazyscroll',
            imagesloaded: 'jquery.imagesloaded',
            evensteven: 'jquery.evensteven',
            tablescroll: 'jquery.tablescroll',
            phatfingaz: 'jquery.phatfingaz',
            hoverIntent: 'jquery.hoverIntent',
            expandcollapse: 'jquery.expandcollapse',
            tabbery: 'jquery.tabbery',
            brotator: 'jquery.brotator',
            scrollitup: 'jquery.scrollitup',
            datepicker: 'jquery-datepicker.min',
            colorbox: 'jquery.colorbox',
            JSON: 'json3.min'
          }
        }
      }
    },

    // Unit tests.
    mochaTest: {
      files: ['test/**/*.test.js']
    },
    mochaTestConfig: {
      options: {
        reporter: 'nyan'        
      }
    },

    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['jshint', 'test']
    }
}

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'mochaTest']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
