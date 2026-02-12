import LargeCatch from '../../pages/Large-Catches.page'
import { defineStep } from '@cucumber/cucumber'

defineStep(/^The catch method is (.+)$/, async function (methodName) {
  await LargeCatch.setMethod(methodName)
})
