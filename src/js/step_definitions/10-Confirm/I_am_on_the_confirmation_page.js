import ConfirmPage from '../../pages/Confirmation.page'
import { defineStep } from '@cucumber/cucumber'

defineStep('I am on the confirmation page', async function () {
  await ConfirmPage.checkOpen()
})
