import SmallCatch from '../../pages/Small-Catches.page'
import { defineStep } from '@cucumber/cucumber'

defineStep(/^I save the small catch and (return to the summary|add another)$/, async function (action) {
  if (action === 'add another') {
    await SmallCatch.saveAndAddAnother()
  } else {
    await SmallCatch.continue()
  }
})
