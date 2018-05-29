"use strict";
// Karma configuration for running unit-tests in Docker
module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-jasmine-ajax',
            'karma-htmlfile-reporter'
        ],
        //logLevel: config.LOG_DEBUG,
        singleRun: false,
        colors: true,
        frameworks: ['jasmine-ajax', 'jasmine'],
        reporters: ['progress', 'html'],
        htmlReporter: {
            outputFile: '../report/unit-test-report.html',
            pageTitle: 'RHD frontend unit-test results'
        },
        failOnEmptyTestSuite: false,

        files: [
            'jasmine-global.js',
            'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.2.0/custom-elements-es5-adapter.js',
            'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.2.0/webcomponents-lite.js',
            'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
            '../../../_docker/drupal/drupal-filesystem/web/core/misc/drupal.js',
            '../../../_docker/drupal/drupal-filesystem/web/core/misc/drupal-init.js',
            '../../../_docker/drupal/drupal-filesystem/web/core/misc/drupalSettingsLoader.js',
            'https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.21.3/system-production.js',
            '../../../_docker/drupal/drupal-filesystem/web/themes/custom/rhdp/rhd-frontend/rhd.js',
            '../../../_docker/drupal/drupal-filesystem/web/themes/custom/rhdp/js/init.js',
            '../**/*_spec.js'          
        ]
    })
};
