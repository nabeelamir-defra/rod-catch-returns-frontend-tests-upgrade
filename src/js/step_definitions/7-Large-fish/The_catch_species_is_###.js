import LargeCatch from '../../pages/Large-Catches.page'
import { defineStep } from '@cucumber/cucumber'

defineStep(/^The catch species is (.+)$/, async function (speciesName) {
  await LargeCatch.setSpecies(speciesName)
})
