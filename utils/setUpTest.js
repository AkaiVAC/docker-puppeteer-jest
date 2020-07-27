// utils/index.js

const browserSession = require('./browserSession');
/**
 *
 * @param {string} path Path to be tested (/path/to)
 * @param {string} params Extra Query params (must start with ?): ?location=asdads&text=123231
 */

module.exports = setUpTest = async (path = '') => {
  const URL = `${path}`;
  await browserSession.page.setExtraHTTPHeaders({
    'X-E2E-TEST': 'test',
  });
  await browserSession.page.setViewport({
    width: 1440,
    height: 900,
  });
  await browserSession.page.goto(URL, {
    waitUntil: 'networkidle2',
  });
};
