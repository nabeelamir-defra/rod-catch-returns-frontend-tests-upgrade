import LicencePage from '../../pages/Licence-page'
import { defineStep } from '@cucumber/cucumber'

defineStep('I am on the licence entry page', async function () {
  await LicencePage.checkOpen()
})
