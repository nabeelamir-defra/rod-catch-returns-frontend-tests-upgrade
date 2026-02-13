import Review from '../../pages/Review.page'
import { defineStep } from '@cucumber/cucumber'

defineStep('I return to summary', async function () {
  await Review.checkOpen()
  await Review.clickCancel()
})
