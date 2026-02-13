import Page from './page'

class RecordsPage extends Page {
  get url () {
    return '/records'
  }

  async clickRecords () {
    const link = await $('=Records')
    await link.click()
  }

  async enterLicense (license) {
    await (await $('input#licenceNumber')).setValue(license)
  }

  async errorMessage () {
    if (!(await (await $('#licenceNumber-error')).getText()).includes('The licence number could not be matched')) {
      throw new Error('license is accepted')
    }
  }

  async clickContinue () {
    const button = await $('[name="continue"]')
    await button.click()
  }
}

export default new RecordsPage()
