import LargeCatch from '../../pages/Large-Catches.page'
import { defineStep } from '@cucumber/cucumber'

defineStep(/^The catch river is (.+)$/, async function (riverName) {
  await LargeCatch.setRiver(riverName)
})
