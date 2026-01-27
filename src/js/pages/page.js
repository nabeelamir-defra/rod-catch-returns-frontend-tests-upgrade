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
      await browser.waitUntil(
        async () => (await browser.getUrl()).includes(this.url),
        {
          timeout: 5000,
          timeoutMsg: 'Expected to navigate to checkout page'
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

  async continue () {
    await this.checkOpen()
    await this.clickNavigationLink(SELECTOR_CONTINUE)
  }
}
