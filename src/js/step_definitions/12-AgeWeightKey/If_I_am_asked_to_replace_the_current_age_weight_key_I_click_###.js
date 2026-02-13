import AgeWeightKeyConflictPage from '../../pages/Age-Weight-Key-Conflict.page'
import { defineStep } from '@cucumber/cucumber'

defineStep(/If I am asked to replace the current age weight key I click (yes|no)/, async (option) => {
  const heading = await $('h1').getText()
  if (heading.includes('An age weight key already exists for the river in')) {
    await AgeWeightKeyConflictPage.setOverwrite(option)
    await AgeWeightKeyConflictPage.continue()
  }
})
