import Review from '../../pages/Draft-Has-Been-Saved.page'
import { defineStep } from '@cucumber/cucumber'

defineStep('I am on the draft saved page', async function () {
  await Review.checkOpen()
  await Review.checkMessage()
})
