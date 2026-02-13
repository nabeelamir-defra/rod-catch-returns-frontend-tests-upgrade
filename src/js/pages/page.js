// https://webdriver.io/docs/pageobjects/
import logger from '../utils/logger'
import waitForNav from '../lib/wait-for-navigation-on-action'
const SELECTOR_CONTINUE = '//*[@name="continue"]'

export default class Page {
  constructor () {
    this.title = 'My Page'
  }

  async open () {
    logger.debug(`Opening url ${this.url}`)
    await browser.url(this.url)
  }

  async checkOpen () {
    try {
      const browserUrl = await browser.getUrl()
      await browser.waitUntil(
        async () => (browserUrl.includes(this.url)),
        {
          timeout: browser.options.waitforTimeout,
          interval: browser.options.waitforInterval,
          timeoutMsg: `The browser url:${browserUrl} did not match the expected url:${this.url}`
        }
      )
    } catch (e) {
      logger.error('Error checking if page is open ', e)
      throw e
    }
    logger.debug(`Page.checkOpen - async checking for ${this.url} completed successfully`)
  }

  async clickNavigationLink (selector) {
    await waitForNav(async function () {
      await $(selector).click()
    })
  }

  static async clickRadioButton (selector) {
    // GOV.UK Radio Buttons cannot be clicked via the input field in some browsers (IE/Safari)
    // The workaround is to use the label instead
    let sel = selector.trim()
    if (!sel.endsWith('+ label')) {
      sel += ' + label'
    }
    const radioButton = await $(sel)
    await radioButton.click()
  }

  async continue () {
    await this.checkOpen()
    await this.clickNavigationLink(SELECTOR_CONTINUE)
  }
}
