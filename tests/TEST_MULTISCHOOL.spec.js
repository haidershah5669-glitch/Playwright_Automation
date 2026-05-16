import { test, expect } from '@playwright/test';

test('SIMS Batch Admission - 5 Students (Alphabets Only)', async ({ page }) => {
  
  const studentData = [
    { first: 'Alishba', last: 'Ali' },
    { first: 'Sana', last: 'Khan' },
    { first: 'Zoya', last: 'Ahmed' },
    { first: 'Fatima', last: 'Hassan' },
    { first: 'Maryam', last: 'Bibi' }
  ];

  // ─── 1. LOGIN ──────────────────────────────────────────────────────────────
 await page.goto('https://appdev.tsssc.edu.pk/site/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('your-email@example.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('YourSecretPassword123');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.waitForURL(/dashboard/, { timeout: 30000 });
  console.log('✅ Login successful');

  // ─── 1.5 SELECT SPECIFIC SCHOOL ─────────────────────────────────────────────
// 1. Click the gear/settings icon in the top right to open the right sidebar
await page.locator('a[data-toggle="control-sidebar"]').click();

// 2. Select the desired school by its visible text
// Change 'Smart STEM High School, Sector E Campus, OS East' to whichever school you need
await page.locator('select[name="school_id"]').selectOption({ 
  label: 'Skill Development Institute ' 
});

// 3. Click the Save button within that form
await page.locator('button:has-text("Save")').click();

// 4. Wait for the page to reload so the session updates
await page.waitForLoadState('networkidle');
console.log('🏫 School context set to Sector E Campus');


  // ─── 2. LOOP THROUGH THE STUDENT DATA ──────────────────────────────────────
  for (let i = 0; i < studentData.length; i++) {
    const student = studentData[i];
    console.log(`\n--- Processing Student: ${student.first} ${student.last} ---`);

    const timestamp   = Date.now() + i;
    const admissionNo = `${1000 + (timestamp % 9000)}`;
    const rollNo      = `${10   + (timestamp % 90)}`;
    const acCode      = `${10000000 + (timestamp % 90000000)}`;
    const codeIdNo    = `${100000   + (timestamp % 900000)}`;

    await page.goto('https://appdev.tsssc.edu.pk/student/create');
    const codeIdInput = page.locator('#code_id_no');
    await codeIdInput.waitFor({ state: 'visible', timeout: 15000 });

    // Fill IDs
    await codeIdInput.fill(codeIdNo);
    await page.locator('#ac_code').fill(acCode);
    await page.locator('#admission_no').fill(admissionNo);
    await page.locator('#roll_no').fill(rollNo);

    // Dynamic Dropdowns
    const classDropdown = page.locator('#class_id');
    const sectionDropdown = page.locator('#section_id');
    await classDropdown.selectOption('23');
    await classDropdown.evaluate(el => el.dispatchEvent(new Event('change', { bubbles: true })));

    await expect(async () => {
      const count = await sectionDropdown.locator('option').count();
      expect(count).toBeGreaterThan(1);
    }).toPass({ timeout: 10000 });

    const sectionValue = await sectionDropdown.evaluate((el) => {
      const valid = Array.from(el.options).find(o => o.value !== "" && o.text.toLowerCase() !== 'select');
      return valid ? valid.value : null;
    });
    if (sectionValue) await sectionDropdown.selectOption(sectionValue);

    // ─── 3. NAMES (Alphabets only) ──────────────────────────────────────────
    await page.locator('#firstname').fill(student.first);
    await page.locator('#lastname').fill(student.last);
    await page.locator('select[name="gender"]').selectOption('Female');

    await page.locator('#dob').evaluate((el) => {
      el.value = '27/06/2015'; 
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });

    await page.locator('#guardian_name').fill('Ali'); 
    await page.locator('#guardian_phone').fill('03215456987');

    // ─── 4. SUBMIT & VERIFY (Fixed Redirect Logic) ──────────────────────────
    console.log(`🚀 Submitting ${student.first}...`);
    
    // We wait for the request to finish, but we don't try to read the body yet
    const responsePromise = page.waitForResponse(res => res.url().includes('/student/create'));

    await page.locator('#addloader').click();
    
    const response = await responsePromise;
    const status = response.status();

    // Give the page a moment to redirect or show errors
    await page.waitForTimeout(2000); 

    // SUCCESS CRITERIA: 
    // 1. Status is 302 (Redirect to view page)
    // 2. OR Status is 200 AND URL no longer includes '/create'
    if (status === 302 || (status === 200 && !page.url().includes('/student/create'))) {
      console.log(`✅ Success: ${student.first} registered!`);
    } else {
      // If we are still on the 'create' page, it failed validation
      console.log(`❌ Failed: ${student.first} stayed on the create page. Check screenshot.`);
      await page.screenshot({ path: `error-${student.first}.png` });
    }

    await page.waitForTimeout(1000); 
  }

  console.log('\n✨ Batch registration complete.');
});