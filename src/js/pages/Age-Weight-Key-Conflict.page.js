import Page from './page'

class AgeWeightKeyConflict extends Page {
  get url () {
    return '/age-weight-key-conflict-check'
  }

  async setOverwrite (option) {
    await Page.clickRadioButton(option === 'yes' ? '#overwrite' : '#overwrite-2')
  }

  async continue () {
    await this.clickNavigationLink('//*[@name="submit"]')
  }
}

export default new AgeWeightKeyConflict()
