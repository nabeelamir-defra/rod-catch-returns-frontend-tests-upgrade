import LoginPage from '../../pages/Licence-page'
import { defineStep } from '@cucumber/cucumber'
import logger from '../../utils/logger'

defineStep(/I submit the licence (.*) and postcode (.*)/, async (licence, postcode) => {
  logger.debug(`Attempting to login with licence: ${licence} and postcode: ${postcode}`)
  await LoginPage.submit(licence, postcode)
})
