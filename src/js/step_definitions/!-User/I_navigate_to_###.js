import { defineStep } from '@cucumber/cucumber'

defineStep(/I navigate to (.*)/, async (url) => {
  await browser.url(url)
})
