const puppeteer = require('puppeteer');

class BrowserSession {
  async setup() {
    this.browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
      ],
      ignoreHTTPSErrors: true,
    });
    process.on('unhandledRejection', (reason, p) => {
      console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
      this.browser.close();
    });
    this.page = await this.browser.newPage();
    // Makes possible to use console.log inside page.evaluate() callback
    this.page.on('console', (msg) => {
      for (let i = 0; i < msg.args.length; ++i) {
        console.log(`${i}: ${msg.args[i]}`);
      }
    });

    // Getting some useful debug logs
    this.page.on('pageerror', (err) => {
      console.error('Page error: ' + err.toString());
    });
    this.page.on('error', (err) => {
      console.error('Error: ' + err.toString());
    });
    this.page.on('requestfailed', (request) => {
      console.error(request.url() + ' ' + request.failure().errorText);
    });
  }

  async teardown() {
    await this.browser.close();
  }
}

module.exports = new BrowserSession();
