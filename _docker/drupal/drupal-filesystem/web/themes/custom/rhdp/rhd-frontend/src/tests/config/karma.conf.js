
// Karma configuration for running unit-tests in Docker
module.exports = function (config) {
    config.set({
        browsers: ['ChromeHeadless'],
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-jasmine-ajax',
            'karma-htmlfile-reporter'
        ],
        //logLevel: config.LOG_DEBUG,
        singleRun: true,
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
            'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.0.14/custom-elements-es5-adapter.js',
            'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.0.14/webcomponents-lite.js',
            'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
            '../../../../../../../core/misc/drupal.js',
            '../../../../../../../core/assets/vendor/domready/ready.min.js',
            '../../../../../../../core/misc/drupalSettingsLoader.js',
            '../../../../../../../core/misc/drupal.init.js',
            '../../../node_modules/systemjs/dist/system-production.js',
            '../../../rhd.min.js',
            '../**/*_spec.js'          
        ]
    })
};
