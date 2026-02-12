import Page from './page'

class SelectSeasonPage extends Page {
  get url () {
    return '/select-year'
  }

  async selectSeason (year) {
    await Page.clickRadioButton(`input[value='${year}']`)
  }
}

export default new SelectSeasonPage()
