import LargeCatch from '../../pages/Large-Catches.page'
import { defineStep } from '@cucumber/cucumber'

defineStep(/^The catch (was|wasn't) released$/, async function (wasIt) {
  // was = true, wasn't = false
  const released = wasIt === 'was'
  await LargeCatch.setReleased(released)
})
