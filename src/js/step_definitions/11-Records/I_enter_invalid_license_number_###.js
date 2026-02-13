import RecordsPage from '../../pages/Records.page'
import { defineStep } from '@cucumber/cucumber'

defineStep(/^I enter invalid license number (.*)$/, async function (license) {
  await RecordsPage.enterLicense(license)
  await RecordsPage.clickContinue()
})
