import Page from './page'

class SavePage extends Page {
  get url () {
    return '/save'
  }

  async checkMessage () {
    if (!(await (await $('main h1')).getText()).includes('catch return has been saved')) {
      throw new Error('Catch return was not successfully saved.')
    }
  }
}

export default new SavePage()
