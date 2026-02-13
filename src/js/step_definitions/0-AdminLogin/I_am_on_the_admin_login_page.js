import AdminLoginPage from '../../pages/Admin-login.page'
import { defineStep } from '@cucumber/cucumber'

defineStep('I am on the admin login page', async function () {
  await AdminLoginPage.checkOpen()
})
