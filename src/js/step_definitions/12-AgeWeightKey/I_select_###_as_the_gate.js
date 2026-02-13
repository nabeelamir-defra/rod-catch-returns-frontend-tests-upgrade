import AgeWeightKeyPage from '../../pages/Age-Weight-Key.page'
import { defineStep } from '@cucumber/cucumber'

defineStep(/I select (.*) as the gate for the age weight key/, async (gate) => {
  await AgeWeightKeyPage.selectGate(gate)
})
