import { MONTHS } from '../../utils/date-utils'
import SmallCatch from '../../pages/Small-Catches.page'
import { defineStep } from '@cucumber/cucumber'

defineStep(/^In (.*) on the river (.*), I caught (.*) by fly, (.*) by spinner, (.*) by bait and released (.*)$/,
  async function (monthName, riverName, fly, spinner, bait, released) {
    await SmallCatch.setMonth(MONTHS[monthName])
    await SmallCatch.setRiver(riverName)
    await SmallCatch.setQuantity('fly', fly)
    await SmallCatch.setQuantity('spinner', spinner)
    await SmallCatch.setQuantity('bait', bait)
    await SmallCatch.setReleased(released)
  })
