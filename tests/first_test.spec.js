import { test, expect } from '@playwright/test';

test('school addmission demo test', async ({ page, context }) => {
  // 1. Start tracing before the test steps
  await context.tracing.start({ screenshots: true, snapshots: true, sources: true });

  await page.goto('https://appdev.tsssc.edu.pk/site/login');
  
  // Login flow
  await page.getByRole('textbox', { name: 'Username' }).fill('haidershah5669@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('@@Musa123');
  // Fixed a potential typo from your snippet: getByRole('button', ...)
  await page.getByRole('button', { name: 'Sign In' }).click(); 

  // Navigation
  await page.getByRole('link', { name: ' Student Information ' }).click();
  await expect(page.getByRole('link', { name: /Admission/ })).toBeVisible();
  await page.getByRole('link', { name: /Admission/ }).click();
  await page.getByRole('link', { name: ' Admission' }).click();

  // Form Filling
  await page.locator('#code_id_no').fill('4752242');
  await page.locator('#ac_code').fill('4541852');
  await page.locator('#admission_no').fill('544452');
  await page.locator('#roll_no').fill('45');

  // Fixed the locator for Class Selection
  await page.getByLabel(/Class/i).selectOption({ label: 'Grade 5' });
  await page.locator('#section_id').selectOption({ label: 'A' });

  await page.locator('#firstname').fill('alishah');
  await page.locator('#lastname').fill('khan');
  await page.locator('select[name="gender"]').selectOption('Male');
  
  await page.locator('#age').fill('15');
  
  // Date selection and Guardian info
  await page.getByText('Date Of Birth *').click();
  await page.getByText('2015').click(); // Simplified for the example
  
  await page.locator('#guardian_name').fill('khan');
  await page.locator('#father_name').fill('Khan');
  await page.locator('#guardian_phone').fill('03215458545');
  await page.locator('#addloader').click();

  // 2. Stop tracing and save it to a file
  await context.tracing.stop({ path: 'trace.zip' });
});