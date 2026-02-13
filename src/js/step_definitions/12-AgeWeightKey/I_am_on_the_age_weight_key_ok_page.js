import AgeWeightKeyPageOk from '../../pages/Age-Weight-Key-Ok.page'
import { defineStep } from '@cucumber/cucumber'

defineStep('I am on the age weight key ok page', async function () {
  await AgeWeightKeyPageOk.checkOpen()
  await AgeWeightKeyPageOk.checkMessage()
})
