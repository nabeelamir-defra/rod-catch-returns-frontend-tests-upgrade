export async function validateTableByCaption (captionText, dataTable) {
  // Find the table by its caption
  const table = await $(`caption*=${captionText}`).parentElement()

  // Assert the row count
  const expectedRowCount = dataTable.raw().length - 1
  const rows = await table.$$('tbody tr')
  expect(rows.length).toEqual(expectedRowCount)

  // Assert the data in the table
  const expectedRows = dataTable.raw().slice(1) // Skip the first row (headers), we just want to validate the content
  const tbodyText = await table.$('tbody').getText() // Convert the whole table to text
  for (const row of expectedRows) {
    const rowText = row.filter(cell => cell !== '<any>').join(' ')
    expect(tbodyText).toContain(rowText) // Assert text in table contains the specified row, because the order of the table can be random
  }
}

/**
 * Finds a row in a table based on a caption selector and criteria for matching cell contents
 *
 * @param {string} captionSelector - CSS selector to find the table caption
 * @param {Object.<string, string>} selectorValuePairs - Object where keys are CSS selectors for cells and values are expected content
 * @returns {Promise<WebdriverIO.Element>} - The matching table row element
 * @throws {Error} - If no matching row is found
 */
export async function findTableRow (captionSelector, selectorValuePairs) {
  const table = await $(captionSelector).parentElement()
  const rows = await table.$$('tbody tr')

  for (const row of rows) {
    const cellValues = await Promise.all(
      Object.entries(selectorValuePairs).map(async ([selector, expectedValue]) => {
        const cell = await row.$(selector)
        const text = await cell?.getText() ?? ''
        return { selector, expectedValue, actualValue: text.trim() }
      })
    )

    if (cellValues.every(({ expectedValue, actualValue }) => actualValue === expectedValue)) {
      return row
    }
  }

  const criteriaStr = Object.entries(selectorValuePairs)
    .map(([selector, value]) => `${selector}: ${value}`)
    .join(', ')

  throw new Error(`Could not find row matching criteria: ${criteriaStr}`)
}

/**
 * Finds a row in the small adult sea trout table matching the specified month and river
 *
 * @param {string} month - The month to search for
 * @param {string} riverName - The river name to search for
 * @returns {Promise<WebdriverIO.Element>} - The matching table row
 * @throws {Error} - If no matching row is found
 */
export async function getSmallCatchRow (month, riverName) {
  return findTableRow(
    'caption*=Small adult sea trout (1lb and under)',
    {
      'th[data-label="Month"]': month,
      'th[data-label="River"]': riverName
    }
  )
}

/**
 * Finds a row in the salmon and large adult sea trout table matching the specified river and type
 *
 * @param {string} riverName - The river name to search for
 * @param {string} type - The catch type to search for
 * @returns {Promise<WebdriverIO.Element>} - The matching table row
 * @throws {Error} - If no matching row is found
 */
export async function getLargeCatchRow (riverName, type) {
  return findTableRow(
    'caption*=Salmon and large adult sea trout',
    {
      'th[data-label="River"]': riverName,
      'td[data-label="Type"]': type
    }
  )
}
