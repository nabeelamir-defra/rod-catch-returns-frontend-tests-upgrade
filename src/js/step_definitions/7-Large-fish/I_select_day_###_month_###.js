import LargeCatch from '../../pages/Large-Catches.page'
import { defineStep } from '@cucumber/cucumber'

defineStep(/I select day as (.+) and month as (.+)/, async function (dayOfMonth, monthNumber) {
  await LargeCatch.setDate(dayOfMonth, monthNumber)
})
