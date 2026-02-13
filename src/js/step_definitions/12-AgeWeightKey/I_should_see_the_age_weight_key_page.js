import { defineStep } from '@cucumber/cucumber'

defineStep('I should see the Age weight key page', async function () {
  await expect(browser).toHaveTitle('Upload a Salmon age weight key - Report your salmon or sea trout catch - GOV.UK')
})
