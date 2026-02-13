import AdminLoginPage from '../../pages/Admin-login.page'
import LicencePage from '../../pages/Licence-page'
import { defineStep } from '@wdio/cucumber-framework'
import logger from '../../utils/logger'

defineStep(/I am an (external|administrative) user/, async (userType) => {
  if (userType === 'administrative') {
    browser.options.baseUrl = browser.options.baseAdminUrl
    await AdminLoginPage.open()
  } else {
    browser.options.baseUrl = browser.options.baseExternalUrl
    await LicencePage.open()
  }
  logger.info(`Starting ${userType} user journey using base url ${browser.options.baseUrl}`)
})
