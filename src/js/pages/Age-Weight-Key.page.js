import Page from './page'

class AgeWeightKeyPage extends Page {
  get url () {
    return '/age-weight-key'
  }

  async clickAgeWeightKeyLink () {
    const link = await $('=Age weight key')
    await link.click()
  }

  async selectGate (gate) {
    const radioButton = await $(`label=${gate}`).parentElement().$('input[type="radio"]')
    await radioButton.click()
  }

  async enterYear (year) {
    await $('input#year').setValue(year)
  }

  async uploadFile (filePath) {
    await $('#upload').addValue(filePath)
  }

  async clickUpload () {
    await $('button=Upload').click()
  }
}

export default new AgeWeightKeyPage()
