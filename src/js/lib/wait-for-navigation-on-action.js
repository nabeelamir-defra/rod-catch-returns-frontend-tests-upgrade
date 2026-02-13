import logger from '../utils/logger'

async function getPageId () {
  const el = await $('#pgid')
  return (await el.isExisting()) ? await el.getHTML() : null
}

async function waitForNav (action) {
  const oldPageId = await getPageId()
  const oldUrl = await browser.getUrl()
  let currentPageId = null

  logger.debug(`Waiting for navigation, old pageId=${oldPageId ?? 'NONE'}`)

  try {
    await action()
    await browser.waitUntil(async () => {
      currentPageId = await getPageId()
      const hasChanged = currentPageId !== null && currentPageId !== oldPageId

      if (!hasChanged) {
        logger.debug(`Still waiting for navigation... old=${oldPageId}, current=${currentPageId}`)
      }

      return hasChanged
    },
    {
      timeout: browser.options.waitforTimeout,
      interval: browser.options.waitforInterval,
      timeoutMsg: `Expected pageId to change from "${oldPageId}"`
    })
  } catch (error) {
    logger.error(
      `Navigation failed: pageId did not change within ${browser.options.waitforTimeout}ms. Old pageId=${oldPageId}, current pageId=${currentPageId}`,
      error
    )
    throw error
  }

  const newUrl = await browser.getUrl()

  logger.debug(`Navigation complete. Old page: id=${oldPageId}, url=${oldUrl} New page: id=${currentPageId}, url=${newUrl}`)
}

export default waitForNav
