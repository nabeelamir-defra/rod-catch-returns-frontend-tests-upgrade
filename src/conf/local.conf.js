import { commonConfig } from './common.conf.js'

export const config = {
  ...commonConfig,
  capabilities: [
    {
      browserName: 'chrome',
      acceptInsecureCerts: true
    },
    {
      browserName: 'firefox',
      acceptInsecureCerts: true
    }
  ]
}
