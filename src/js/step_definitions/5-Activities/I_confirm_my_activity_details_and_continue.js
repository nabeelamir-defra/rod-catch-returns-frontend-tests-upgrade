import Activity from '../../pages/Add-Activities.page'
import { defineStep } from '@cucumber/cucumber'

defineStep('I confirm my activity details and continue', async function () {
  await Activity.continue()
})
