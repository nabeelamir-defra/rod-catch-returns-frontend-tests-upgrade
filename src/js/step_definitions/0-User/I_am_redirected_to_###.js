import { defineStep } from '@cucumber/cucumber'

defineStep(/I am redirected to (.*)/, async (url) => {
  await expect(browser).toHaveUrl(expect.stringContaining(url))
})
