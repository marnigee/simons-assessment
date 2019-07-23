/**
 * @jest-environment jest-environment-webdriver
 */

const url = 'https://simons-assessment.netlify.com/'

// some basic smoke tests for loading app
describe('simons-assessment.herokuapp.com#index', () => {
  test('it renders index page title', async () => {
    await browser.get(url)
    const app_title = await browser.findElement(by.css('.heading')).getText()
    expect(app_title).toContain('DOB Job Application Filings')
  })

  test('it renders index page search input', async () => {
    await browser.get(url)
    const search_input = await browser.findElement(by.css('.search-input'))
    expect(search_input).toBeDefined();
  })
})
