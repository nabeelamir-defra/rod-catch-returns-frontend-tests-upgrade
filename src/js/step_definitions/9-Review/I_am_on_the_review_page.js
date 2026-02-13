import Review from '../../pages/Review.page'
import { defineStep } from '@cucumber/cucumber'

defineStep('I am on the review page', async function () {
  await Review.checkOpen()
})

defineStep('I am on the review page and I click submit', async function () {
  await Review.checkOpen()
  await Review.continue()
})

defineStep('I am on the review page and I click unlock', async function () {
  await Review.checkOpen()
  await Review.clickUnlock()
})
