import Delete from '../../pages/Delete.page'
import { defineStep } from '@cucumber/cucumber'

defineStep('I am on the delete large catches page and I click delete', async function () {
  const LargeCatchDelete = new Delete('/delete/catches')
  await LargeCatchDelete.checkOpen()
  await LargeCatchDelete.clickDelete()
})
