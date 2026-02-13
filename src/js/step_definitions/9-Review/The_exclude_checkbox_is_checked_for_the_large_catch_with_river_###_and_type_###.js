import Review from '../../pages/Review.page'
import { defineStep } from '@cucumber/cucumber'

defineStep(/The exclude checkbox is checked for the large catch with the river as (.*) and the type as (.*)/, async (riverName, type) => {
  await Review.checkExcludeCheckboxCheckedLargeCatch(riverName, type)
})
