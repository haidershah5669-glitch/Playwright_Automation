const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 90000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries:2,
reporter: [['list'], ['html', { open: 'never' }]],
use: {
    /* Base URL to use in actions like await page.goto('/') */
    // baseURL: 'http://127.0.0.1:3000',

    /* Pop up the browser window so you can see it */
    headless: false,

    /* Maximum time each action such as `click()` can take */
    actionTimeout: 15000,

    /* COLLECT TRACE FOR EVERY RUN */
    trace: 'on',
video: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});