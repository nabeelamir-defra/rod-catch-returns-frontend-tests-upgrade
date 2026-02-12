import Activity from '../../pages/Add-Activities.page'
import { defineStep } from '@cucumber/cucumber'

defineStep(/I fished the river (.*) for (\d+) days with mandatory release and (\d+) other days/, async (riverName, daysWithMandatoryRelease, daysOther) => {
  await Activity.checkOpen()
  await Activity.selectRiver(riverName)
  await Activity.setDaysFishedWithMandatoryRelease(daysWithMandatoryRelease)
  await Activity.setDaysFishedOther(daysOther)
})
