import { commonConfig } from './common.conf.js'
import os from 'os'

const browserstackUser = process.env.BROWSERSTACK_USERNAME
const browserstackKey = process.env.BROWSERSTACK_ACCESS_KEY

if (!(browserstackUser || browserstackKey)) {
  throw new Error('Please ensure that the BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY environment variables are defined.')
}

const setupCapabilities = function (capabilitiesArray) {
  let buildTimestamp = new Date().toISOString()
  buildTimestamp = buildTimestamp.substring(0, buildTimestamp.length - 8)
  return capabilitiesArray.map(cap =>
    ({
      ...cap,
      build: `${process.env.USER}@${os.hostname()} ${buildTimestamp}`.replace(/[^A-Za-z0-9 :._@]/g, '_'),
      maxInstances: 1,
      project: 'Rod Catch Returns',
      'browserstack.local': true,
      'browserstack.debug': true,
      'browserstack.video': true,
      'browserstack.timezone': 'London',
      'browserstack.javascriptEnabled': true,
      pageLoadStrategy: 'normal',
      acceptSslCerts: true

    }))
}

let browserStackProxyOpts = {}
if (process.env.BROWSER_PROXY_HOST) {
  browserStackProxyOpts = {
    forceProxy: true,
    proxyHost: process.env.BROWSER_PROXY_HOST,
    proxyPort: process.env.BROWSER_PROXY_PORT || 3128
  }
}

export const config = {
  ...commonConfig,
  // ==================
  // Browserstack selenium host/port
  // ==================
  host: 'hub-cloud.browserstack.com',
  port: 80,
  path: '/wd/hub',

  //
  // =================
  // Browserstack options
  // =================
  user: browserstackUser,
  key: browserstackKey,
  browserstackLocal: true,

  browserstackOpts: {
    ...browserStackProxyOpts,
    logFile: './logs/local.log',
    force: true,
    forceLocal: true
  },
  // Default timeout for all waitFor* commands.
  waitforTimeout: 90000,

  // Disable screenshots when used with browserstack.  Their usually of little use on the test runner side.
  // Browserstack video and screenshots are more useful.
  screenshotPath: null,
  screenshotOnReject: false,

  // ============
  // Capabilities
  // ============
  maxInstances: 1,
  capabilities: setupCapabilities([

    // iPhone 8 Plus
    {
      browserName: 'iPhone 8 Plus Real Device',
      os_version: '11.0',
      device: 'iPhone 8 Plus',
      real_mobile: 'true'
    },
    // Android
    {
      browserName: 'Samsung Galaxy S8 Real Device',
      os_version: '7.0',
      device: 'Samsung Galaxy S8',
      real_mobile: 'true'
    },
    // Edge 17
    {
      os: 'Windows',
      os_version: '10',
      browserName: 'Edge',
      browser_version: '17.0'
    },
    // Win 7 / IE11
    {
      os: 'Windows',
      os_version: '7',
      browserName: 'IE',
      browser_version: '11.0'
    },
    // // MacOSX "Mojave" Safari 12 - DISABLED due to automation issues
    // {
    //   'os': 'OS X',
    //   'os_version': 'Mojave',
    //   'browserName': 'Safari',
    //   'browser_version': '12.0',
    // },
    // MacOSX "High Sierra" Safari 11
    {
      os: 'OS X',
      os_version: 'High Sierra',
      browserName: 'Safari',
      browser_version: '11.1'
    },
    // Windows 10 Firefox
    {
      os: 'Windows',
      os_version: '10',
      browserName: 'Firefox',
      browser_version: '63.0'
    },
    // Windows 10 Chrome
    {
      os: 'Windows',
      os_version: '10',
      browserName: 'Chrome',
      browser_version: '70.0'
    }
  ]),
  // Test runner services
  services: ['browserstack'],

  cucumberOpts: {
    // Configure cucumberjs to ignore any features marked with browserstackIgnore.
    tags: ['~@browserstackIgnore'],
    // Increase step timeout on browserstack (things just seem to take longer!)
    timeout: 240000
  }
}
