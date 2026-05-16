import { test, expect } from '@playwright/test';

test('Generate Student Fee Voucher', async ({ page }) => {
  // Increase total timeout to 2 minutes because the server response is slow (approx 1 min per load)
  test.setTimeout(120000);

  // 1. Login Process
  await page.goto('https://appdev.tsssc.edu.pk/admin/admin/dashboard');
  await page.getByRole('textbox', { name: 'Username' }).fill('haidershah5669@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('@@Musa123');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // 2. Dashboard Navigation (Wait for page to be ready before clicking)
  // Instead of waitForLoadState, wait for the specific menu item to exist
  const accountsLink = page.getByRole('link', { name: /Accounts/i }).first();
  await accountsLink.waitFor({ state: 'visible', timeout: 60000 });
  await accountsLink.click();

  // 3. Click Fee Voucher (This link appears after clicking Accounts)
  const feeVoucherLink = page.getByRole('link', { name: /Fee Voucher/i });
  await feeVoucherLink.waitFor({ state: 'visible' });
  await feeVoucherLink.click();

  // 4. Form Selection (Crucial: Wait for the new page elements to appear)
  // This prevents the error on line 24 seen in image_100adc.png
  const classSelect = page.locator('#class_id');
  await classSelect.waitFor({ state: 'visible', timeout: 30000 });
  await classSelect.selectOption('24');

  // Wait for dynamic population of Section based on Class
  await page.waitForSelector('#section_id option[value="16"]', { state: 'attached' });
  await page.locator('#section_id').selectOption('16');

  // Wait for dynamic population of Roll Number based on Section
  await page.waitForSelector('#roll_no option[value="36"]', { state: 'attached' });
  await page.locator('#roll_no').selectOption('36');

  // 5. Month Selection
  await page.getByRole('textbox', { name: 'Month *' }).click();
  await page.getByText('Jun', { exact: true }).click();

  // 6. Tuition Fee Entry
  const tuitionRow = page.getByRole('row', { name: 'Tuition Fee Add More' });
  await tuitionRow.locator('input[name="feevalue[]"]').fill('8000');

  // 7. Generate Voucher and Handle Popup
  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: 'Generate' }).click(),
  ]);

  // 8. Verification
  await popup.waitForLoadState();
  await expect(popup).toBeDefined();
});