import LoginPage from '../../pages/Licence-page'
import { defineStep } from '@cucumber/cucumber'
import logger from '../../utils/logger'

defineStep(/I submit the licence and postcode for test user ([1-9][0-9]*)/, async (userNumber) => {
  const user = await browser.getUser(userNumber)
  logger.debug(`Attempting to login as ${user.username}`)
  await LoginPage.submit(user.username, user.password)
})
