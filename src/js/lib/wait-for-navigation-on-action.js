import logger from '../utils/logger'

const waitForNav = async (action) => {
  const oldPageId = $('#pgid') ? await $('#pgid').getHTML() : 'NO_OLD_PAGE_ID_FOUND'
  const oldPageUrl = await browser.getUrl()
  let currentPageId = null

  logger.debug(`Waiting for navigation, old page id=${oldPageId}`)

  try {
    await action()

    await browser.waitUntil(
      async () => {
        try {
          currentPageId = await $('#pgid').getHTML()
        } catch (e) {
          currentPageId = null
        }

        const hasChanged = (currentPageId !== null && currentPageId !== oldPageId)
        if (!hasChanged) {
          logger.debug(`Waiting for page to load (loaded: ${hasChanged}).  [Old page id: ${oldPageId}, current page id: ${currentPageId}]`)
        }
        return hasChanged
      }, browser.options.waitforTimeout, 'expected page id to change as result of action', browser.options.waitforInterval
    )
  } catch (e) {
    logger.error(`Expected page id (${oldPageId}) to change within ${browser.options.waitforTimeout}ms of navigation.  Current page id is ${currentPageId}`, e)
    throw e
  }

  logger.debug(`Page load complete.  [Old page: id=${oldPageId}, url=${oldPageUrl}.  Current page: id=${currentPageId}, url=${browser.getUrl()}]`)
}

export default waitForNav
