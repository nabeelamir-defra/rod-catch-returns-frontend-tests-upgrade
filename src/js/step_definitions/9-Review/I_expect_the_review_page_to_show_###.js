import Review from '../../pages/Review.page'
import { defineStep } from '@cucumber/cucumber'

defineStep('I expect the review page to show the following activities', async function (activityTable) {
  await Review.validateActivitiesTable(activityTable)
})

defineStep('I expect the review page to show the following small catches', async function (smallCatchesTable) {
  await Review.validateSmallCatchesTable(smallCatchesTable)
})

defineStep('I expect the review page to show the following large catches', async function (largeCatchesTable) {
  await Review.validateLargeCatchesTable(largeCatchesTable)
})
