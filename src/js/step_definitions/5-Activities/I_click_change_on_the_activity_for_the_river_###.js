import Summary from '../../pages/Summary.page'
import { defineStep } from '@cucumber/cucumber'

defineStep(/I click change on the activity for the river (.*)/, async (riverName) => {
  await Summary.clickChangeRiver(riverName)
})
