import Review from '../../pages/Review.page'
import { defineStep } from '@cucumber/cucumber'

defineStep(/The exclude checkbox is checked for the small catch with the month as (.*) and the river as (.*)/, async (month, riverName) => {
  await Review.checkExcludeCheckboxCheckedSmallCatch(month, riverName)
})
