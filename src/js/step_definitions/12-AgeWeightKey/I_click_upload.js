import AgeWeightKeyPage from '../../pages/Age-Weight-Key.page'
import { defineStep } from '@cucumber/cucumber'

defineStep('I click upload', async function () {
  await AgeWeightKeyPage.clickUpload()
})
