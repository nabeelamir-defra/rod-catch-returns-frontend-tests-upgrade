import Summary from '../../pages/Summary.page'
import { defineStep } from '@cucumber/cucumber'

defineStep(/I click (change|delete|exclude) on the small catch with the month as (.*) and the river as (.*)/, async (action, month, riverName) => {
  if (action === 'change') {
    await Summary.clickChangeSmallCatch(month, riverName)
  } else if (action === 'delete') {
    await Summary.clickDeleteSmallCatch(month, riverName)
  } else {
    await Summary.clickExcludeCheckboxSmallCatch(month, riverName)
  }
})
