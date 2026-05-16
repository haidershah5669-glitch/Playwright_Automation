const { defineConfig } = require('@playwright/test'); 
 
module.exports = defineConfig({ 
  testDir: './tests', 
  timeout: 90000, 
  projects: [ 
    { name: 'chromium', use: { browserName: 'chromium' } }, 
  ], 
  use: { 
    headless: false, 
    actionTimeout: 15000, 
    screenshot: 'only-on-failure', 
    video: 'retain-on-failure', 
  }, 
  reporter: [['list'], ['html', { open: 'never' }]], 
}); 
