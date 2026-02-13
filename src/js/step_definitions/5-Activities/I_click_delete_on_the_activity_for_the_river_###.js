import Summary from '../../pages/Summary.page'
import { defineStep } from '@cucumber/cucumber'

defineStep(/I click delete on the activity for the river (.*)/, async function (riverName) {
  await Summary.open()
  await Summary.checkOpen()
  await Summary.clickDeleteRiver(riverName)
})
