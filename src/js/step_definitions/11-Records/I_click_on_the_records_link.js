import RecordsPage from '../../pages/Records.page'
import { defineStep } from '@cucumber/cucumber'

defineStep('I click on the records link', async function () {
  await RecordsPage.clickRecords()
})
