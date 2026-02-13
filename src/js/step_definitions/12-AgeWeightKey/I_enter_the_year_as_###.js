import AgeWeightKeyPage from '../../pages/Age-Weight-Key.page'
import { defineStep } from '@cucumber/cucumber'

defineStep(/I enter the year as (.*) for the age weight key/, async function (year) {
  const resolvedYear = year === 'the current year' ? new Date().getFullYear() : year
  await AgeWeightKeyPage.enterYear(resolvedYear)
})
