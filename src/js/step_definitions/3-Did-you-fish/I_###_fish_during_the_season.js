import DYF from '../../pages/Did-you-fish.page'
import { defineStep } from '@cucumber/cucumber'

defineStep(/^I (did|didn't) fish during the season$/, async (didThey) => {
  await DYF.checkOpen()
  await DYF.setFished(didThey === 'did')
  await DYF.continue()
})
