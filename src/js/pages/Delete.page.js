import Page from './page'

class DeletePage extends Page {
  constructor (href) {
    super()
    this.href = href
  }

  get url () {
    return this.href
  }

  async clickCancel () {
    const clickCancel = await browser.element('#return-summary')
    await clickCancel.click()
  }

  async clickDelete () {
    const clickDelete = await $('button=Delete')
    await clickDelete.click()
  }
}

export default DeletePage
