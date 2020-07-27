const browserSession = require('./utils/browserSession');
const setUpTest = require('./utils/setUpTest');
const expect = require('expect-puppeteer');

describe('Google', () => {
  beforeEach(async () => {
    await browserSession.setup();
    await setUpTest('https://www.google.com');
  });

  it('should display "google" text on page', async () => {
    await expect(browserSession.page).toMatch('google');
  });
  afterEach(async () => {
    await browserSession.teardown();
  });
});
