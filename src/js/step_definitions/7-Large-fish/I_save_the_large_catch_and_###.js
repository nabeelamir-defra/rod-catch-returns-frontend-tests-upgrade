import LargeCatch from '../../pages/Large-Catches.page'
import { defineStep } from '@cucumber/cucumber'

defineStep(/^I save the large catch and (return to the summary|add another)$/, async function (action) {
  if (action === 'add another') {
    await LargeCatch.saveAndAddAnother()
  } else {
    await LargeCatch.continue()
  }
})
