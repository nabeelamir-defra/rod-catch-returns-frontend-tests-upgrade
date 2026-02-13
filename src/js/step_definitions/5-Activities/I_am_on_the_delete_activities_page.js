import Delete from '../../pages/Delete.page'
import { defineStep } from '@cucumber/cucumber'

defineStep('I am on the delete activities page and I click delete', async function () {
  const ActivityDelete = new Delete('/delete/activities')
  await ActivityDelete.checkOpen()
  await ActivityDelete.clickDelete()
})
