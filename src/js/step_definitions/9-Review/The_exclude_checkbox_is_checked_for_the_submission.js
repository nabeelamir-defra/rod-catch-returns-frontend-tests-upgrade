import Review from '../../pages/Review.page'
import { defineStep } from '@cucumber/cucumber'

defineStep('The exclude checkbox is checked for the submission', async () => {
  await Review.checkExcludeCheckboxCheckedSubmission()
})
