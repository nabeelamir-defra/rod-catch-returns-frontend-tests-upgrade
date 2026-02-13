import Summary from '../../pages/Summary.page'
import { defineStep } from '@cucumber/cucumber'

defineStep('I expect the summary page to show the following activities', async function (activityTable) {
  const rows = activityTable.hashes()
  await Summary.checkActivityTableLength(rows.length)
  for (const row of rows) {
    await Summary.checkActivityTableContains(row.River, row.DaysFishedWithMandatoryRelease, row.DaysFishedOther)
  }
})

defineStep('I expect the summary page to show the following large catches', async function (largeCatchesTable) {
  await Summary.validateLargeCatchTable(largeCatchesTable)
})

defineStep('I expect the summary page to show the following small catches', async function (smallCatchesTable) {
  await Summary.validateSmallCatchTable(smallCatchesTable)
})
