import Delete from '../../pages/Delete.page'
import { defineStep } from '@cucumber/cucumber'

defineStep('I am on the delete small catches page and I click delete', async function () {
  const SmallCatchDelete = new Delete('/delete/small-catches')
  await SmallCatchDelete.checkOpen()
  await SmallCatchDelete.clickDelete()
})
