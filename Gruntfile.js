/*jslint node: true */
'use strict';

function getCLOption(grunt, options) {
  var optionValue = false;
  options.forEach(function(option) {
    optionValue = optionValue || grunt.option(option);
  });
  var value = optionValue || false;
  value = (value === true) || (value === 'on');

  return value;
}

module.exports = function(grunt) {
  require('time-grunt')(grunt);

  var inspect = getCLOption(grunt, ['i', 'inspect']);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: [
        'Gruntfile.js',
        'index.js',
        'lib/**/*.js',
        'test/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // mochacli: {
    //   options: {
    //     require: ['should'],
    //     reporter: 'dot',
    //     'debug-brk': inspect
    //   },
    //   all: [
    //     'test/**/test-*.js'
    //   ]
    // },

    readmejs: {
      options: {
        compressed: true,
        quoteSummary: false,
        showFilePath: false
      },
      lib: {
        files: {
          'README.md': ['index.js']
        }
      }
    },
    watch: {
      scripts: {
        files: [
          'Gruntfile.js',
          'index.js',
          'lib/**/*.js',
          'test/*.js'
        ],
        tasks: ['jshint', 'readmejs'],
        options: {
          spawn: false,
        },
      },
    },

  });

  grunt.loadNpmTasks('grunt-readmejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'readmejs']);

  grunt.registerTask('dev', ['jshint', 'readmejs', 'watch']);
  grunt.registerTask('test', ['jshint']);
};
