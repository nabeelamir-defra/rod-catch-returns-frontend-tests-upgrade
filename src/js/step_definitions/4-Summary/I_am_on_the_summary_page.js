import Summary from '../../pages/Summary.page'
import { defineStep } from '@cucumber/cucumber'

defineStep('I am on the summary page and select the add river link', async function () {
  await Summary.checkOpen()
  await Summary.clickAddRiver()
})

defineStep('I am on the summary page and select the large catch link', async function () {
  await Summary.checkOpen()
  await Summary.clickAddLargeCatch()
})

defineStep('I am on the summary page and select the small catch link', async function () {
  await Summary.checkOpen()
  await Summary.clickAddSmallCatch()
})

defineStep('I am on the summary page and I click review catch return', async function () {
  await Summary.checkOpen()
  await Summary.continue()
})

defineStep('I am on the summary page and I save and exit the service', async function () {
  await Summary.checkOpen()
  await Summary.clickSaveAsDraft()
})

defineStep('I am on the summary page and I continue to the review page', async function () {
  await Summary.continue()
})

defineStep('I am on the summary page', async function () {
  await Summary.checkOpen()
})

defineStep('I exclude the submission', async function () {
  await Summary.excludeSubmission()
})
