import Summary from '../../pages/Summary.page'
import { defineStep } from '@cucumber/cucumber'

defineStep('I expect the summary page to show the following activities', async function (activityTable) {
  const rows = activityTable.hashes()
  await Summary.checkActivityTableLength(rows.length)
  for (const row of rows) {
    await Summary.checkActivityTableContains(row.River, row.DaysFishedWithMandatoryRelease, row.DaysFishedOther)
  }
})
