import AgeWeightKeyPage from '../../pages/Age-Weight-Key.page'
import { defineStep } from '@cucumber/cucumber'
import { fileURLToPath } from 'url'

defineStep(/I upload the file (.*) to the age weight key/, async (file) => {
  const fileUrl = new URL(`../../../files/${file}`, import.meta.url)
  const filePath = fileURLToPath(fileUrl)
  await AgeWeightKeyPage.uploadFile(filePath)
})
