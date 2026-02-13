import AgeWeightKeyPage from '../../pages/Age-Weight-Key.page'
import { defineStep } from '@cucumber/cucumber'

defineStep('I click on the Age weight key link', async function () {
  await AgeWeightKeyPage.clickAgeWeightKeyLink()
})
