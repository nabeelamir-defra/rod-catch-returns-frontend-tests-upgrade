import { commonConfig } from './common.conf.js'

export const config = {
  ...commonConfig,
  capabilities: [
    {
      browserName: 'chrome',
      browserVersion: 'stable',
      'goog:chromeOptions': {
        args: ['--headless', '--disable-gpu', '--no-sandbox']
      }
    },
    {
      browserName: 'firefox',
      browserVersion: 'latest',
      'moz:firefoxOptions': {
        args: ['-headless'],
        binary: '/usr/bin/firefox'
      }
    }
  ],
}
