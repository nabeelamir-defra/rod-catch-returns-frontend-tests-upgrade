import Page from './page'

class AgeWeightKeyPageOk extends Page {
  get url () {
    return '/age-weight-key-ok'
  }

  async checkMessage () {
    const titleText = await $('main h1').getText()
    expect(titleText).toBe('Upload complete')
  }
}

export default new AgeWeightKeyPageOk()
