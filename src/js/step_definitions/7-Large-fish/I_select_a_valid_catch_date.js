import LargeCatch from '../../pages/Large-Catches.page'
import { defineStep } from '@cucumber/cucumber'

function getLatestValidDateForSubmissionYear (submissionYear) {
  const today = new Date()
  const currentYear = today.getFullYear()

  // If submission is for a previous year,
  // return 31st December of that year (end of year)
  if (submissionYear < currentYear) {
    return new Date(submissionYear, 11, 31)
  }

  // Otherwise return today
  return today
}

function getValidDate (submissionYear) {
  const startOfYear = new Date(submissionYear, 0, 1) // Jan 1
  const latestValid = getLatestValidDateForSubmissionYear(submissionYear)
  const diffMs = latestValid.getTime() - startOfYear.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const randomDays = Math.floor(Math.random() * diffDays)

  // Create new date (don't mutate startOfYear)
  const result = new Date(startOfYear)
  result.setDate(result.getDate() + randomDays)

  return result
}

defineStep('I select a valid catch date', async function () {
  const catchDate = getValidDate(browser.rcrSubmissionSeason)

  const day = catchDate.getDate().toString()
  const month = (catchDate.getMonth() + 1).toString()

  await LargeCatch.setDate(day, month)
})
