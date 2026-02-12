import Page from './page'

const SELECTOR_FISHED_YES = '#dyf'
const SELECTOR_FISHED_NO = '#dyf-2'

class SelectDYFPage extends Page {
  get url () {
    return '/did-you-fish'
  }

  async setFished (fished) {
    await Page.clickRadioButton(fished ? SELECTOR_FISHED_YES : SELECTOR_FISHED_NO)
  }
}

export default new SelectDYFPage()
