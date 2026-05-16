
// const { test, expect } = require('@playwright/test');

// test('school admission demo test', async ({ page }) => {
//   // 1. Go to the website
//   await page.goto('https://demo.playwright.dev/todomvc/');

//   // 2. Perform an action (Example: Adding a todo)
//   const todoInput = page.getByPlaceholder('What needs to be done?');
//   await todoInput.fill('Finish Playwright Setup');
//   await todoInput.press('Enter');

//   // 3. Make an assertion (This makes the test pass/fail)
//   await expect(page.getByTestId('todo-title')).toHaveText([
//     'Finish Playwright Setup'
//   ]);
  
//   // Note: If this fails, the trace is saved. 
//   // Because we set trace: 'on', it saves even if it passes!
// });


import { test, expect } from '@playwright/test';

test('school addmission demo test', async ({ page }) => {
  await page.goto('https://appdev.tsssc.edu.pk/site/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('haidershah5669@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('@@Musa123');
  await page.getByRole('button123', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: ' Student Information ' }).click();

  await expect(page.getByRole('link', { name: /Admission/ })).toBeVisible();

  //await page.getByRole('link', { name: ' Data' }).click();

  await page.getByRole('link', { name: /Admission/ }).click();

  await page.getByRole('link', { name: ' Admission' }).click();
  await page.locator('#code_id_no').click();
  await page.locator('#code_id_no').fill('4752242');
  await page.locator('#ac_code').click();
  await page.locator('#ac_code').fill('4541852');
  await page.locator('#admission_no').click();
  await page.locator('#admission_no').fill('544452');
  await page.locator('#roll_no').click();
  await page.locator('#roll_no').fill('45');
  //await page.locator('#class_id').selectOption('24');
  //await page.locator('#section_id').selectOption('1644');
 // await page.getByLabel(/Class/i).selectOption('Grade 5');
await page.getByLabel('/Class/i').selectOption('Grade 5');
await page.locator('#section_id').selectOption({ label: 'A' });

  await page.locator('#firstname').click();
  await page.locator('#firstname').fill('alishah');
  await page.locator('#firstname').press('Tab');
  await page.locator('#lastname').fill('khan');
  await page.locator('#lastname').press('Tab');
  await page.locator('select[name="gender"]').press('ArrowDown');
  await page.locator('select[name="gender"]').selectOption('Male');
  await page.locator('select[name="gender"]').press('ArrowRight');
  await page.locator('select[name="gender"]').selectOption('Female');
  await page.locator('select[name="gender"]').press('ArrowRight');
  await page.locator('select[name="gender"]').press('Tab');
  await page.locator('#age').click();
  await page.locator('#age').fill('15');
  await page.locator('#nationality').click();
  await page.getByText('Date Of Birth *').click();
  await page.getByRole('columnheader', { name: '«' }).click();
  await page.getByRole('columnheader', { name: '«' }).click();
  await page.getByRole('columnheader', { name: 'March' }).click();
  await page.getByRole('columnheader', { name: '«' }).click();
  await page.getByRole('columnheader', { name: '«' }).click();
  await page.getByRole('columnheader', { name: '2024' }).click();
  await page.getByRole('columnheader', { name: '«' }).click();

await page.getByText('2019', { exact: true }).click();
//await page.getByRole('cell').getByText('2019', { exact: true }).click();


  await page.getByText('2019').click();
  await page.getByRole('cell').getByText('2010').click();
  await page.getByText('2015').click();
  await page.getByText('Discount Category Initial').click();
  await page.getByRole('treeitem', { name: 'Initial Discount 50%' }).click();
  await page.getByRole('list').filter({ hasText: '×Initial Discount 50%' }).click();
  await page.getByRole('treeitem', { name: 'FDHL - Employee 40%' }).click();
  await page.locator('#guardian_name').click();
  await page.locator('#guardian_name').fill('khan');
  await page.locator('#guardian_name').press('Tab');
  await page.locator('#guardian_relation').press('Tab');
  await page.locator('#guardian_phone').fill('khan');
  await page.locator('#father_name').click();
  await page.locator('#father_name').fill('Khan');
  await page.locator('#guardian_phone').click();
  await page.locator('#guardian_phone').fill('03215458545');
  await page.locator('#addloader').click();
});