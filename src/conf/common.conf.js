import userManager from '../js/lib/user-manager.js'

// Level of logging verbosity: trace | debug | info | warn | error | silent
const seleniumLogLevel = process.env.SELENIUM_LOG_LEVEL || 'error'

export const commonConfig = {
  runner: 'local',
  /*
   * ==================
   * Specify Test Files
   * ==================
   */
  specs: [
    '../features/*.feature'
  ],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // First, you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
  // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
  // files and you set maxInstances to 10, all spec files will get tested at the same time
  // and 30 processes will get spawned. The property handles how many capabilities
  // from the same test should run tests.
  //
  maxInstances: 1,
  //
  // If you have trouble getting all important capabilities together, check out the
  // Sauce Labs platform configurator - a great tool to configure your capabilities:
  // https://saucelabs.com/platform/platform-configurator
  //
  capabilities: [{
    browserName: 'chrome'
  }],

  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: seleniumLogLevel,
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  // baseUrl: 'http://localhost:8080',
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 120000,
  // Default interval for all waitFor* commands (number of ms between checks to see if the runner should stop waiting)
  waitforInterval: 500,
  // Default timeout in milliseconds for request if browser driver or grid doesn't send response
  connectionRetryTimeout: 90000,
  // Default request retries count
  connectionRetryCount: 3,
  // Services take over a specific job you don't want to take care of
  services: ['firefox-profile'],

  // Framework you want to run your specs with.
  framework: 'cucumber',

  // Test reporter for stdout.
  reporters: ['spec'],

  baseExternalUrl: process.env.SERVICE_URL || 'http://localhost:3000',
  baseAdminUrl: process.env.ADMIN_SERVICE_URL || 'http://localhost:4000',

  // If you are using Cucumber you need to specify the location of your step definitions.
  cucumberOpts: {
    // <string[]> (file/dir) require files before executing features
    require: ['./src/js/step_definitions/**/*.js'],
    // <boolean> show full backtrace for errors
    backtrace: false,
    // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    requireModule: [],
    // <boolean> invoke formatters without executing steps
    dryRun: false,
    // <boolean> abort the run on first failure
    failFast: true,
    // <string[]> Only execute the scenarios with name matching the expression (repeatable).
    name: [],
    // <boolean> hide step definition snippets for pending steps
    snippets: true,
    // <boolean> hide source uris
    source: true,
    // <boolean> fail if there are any undefined or pending steps
    strict: false,
    // <string> (expression) only execute the features or scenarios with tags matching the expression
    tagExpression: 'not @Pending',
    // <number> timeout for step definitions
    timeout: 60000,
    // <boolean> Enable this config to treat undefined definitions as warnings.
    ignoreUndefinedDefinitions: false,
    failAmbiguousDefinitions: true // Treat ambiguous definitions as errors.
  },

  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {object}         browser      instance of created browser/device session
     */
  /*
   * Gets executed before test execution begins. At this point you can access all global
   * variables, such as `browser`. It is the perfect place to define custom commands.
   */
  before: async (capabilities, specs) => {
    browser.addCommand('getUser', async (number) => {
      return userManager.getUser(number)
    })

    browser.addCommand('getAdmin', async (number) => {
      return userManager.getAdmin(number)
    })

    // Reset submission for all RCR users identified in the test configuration before each feature runs
    await userManager.initialise()
    await userManager.deleteAllUserSubmissions()
    await userManager.deleteAllGrilseProbabilities()
  }
}
