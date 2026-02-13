import { defineStep } from '@cucumber/cucumber'

defineStep('I expect the error summary to show the following errors', async function (dataTable) {
  const expectedErrors = dataTable.raw().flat()

  const errorSummary = await $('.govuk-error-summary')
  const actualText = await errorSummary.getText()

  for (const expected of expectedErrors) {
    expect(actualText).toContain(expected)
  }
})
