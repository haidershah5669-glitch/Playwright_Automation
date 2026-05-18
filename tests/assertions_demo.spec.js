import test, {page, expect} from '@playwright/test'
//import { waitForDebugger } from 'node:inspector'
test ('Asserstion demo', async({page}) => {
 await page.goto('https://kitchen.applitools.com/')  
await page.pause()
console.log("Current Browser URL is:", page.url());

 //ASSERTIONS
 //1. PRESENT/NOT PRESENT ELEMENTS
await expect(page.locator('text=The Kitchen')).toHaveCount(1)
//await page.$('text=kitchen') //older version
//await expect(page.locator('text=kitchen')).toBeVisible(); //this line shows the word is visible to human eye..script runs as a human
const isKitchenVisible = await page.locator('text=kitchen').isVisible();
if(isKitchenVisible){
    console.log('the kitchen text is visible doing action TRUE')
    await page.locator('text=kitchen').click();
}
else{
    console.log('the kitchen is not visible.doing action FALSE');
}

//2. Visible/hidden(check actual=expected)
 await expect(page.getByText('The Kitchen',{exact:false})).toBeVisible(); //is visible
 // Hey Playwright, look at the current page, find a button that says 'Close' and click it. 
 // Don't move to the next line of code until you are completely done clicking it."
 await page.getByRole('link', { name: 'Alert' }).click();
 //await expect(page.getByText('The Kitchen',{exact:false})).toBeHidden(); //ishidden
await expect(page.getByText('The Kitchen')).not.toBeHidden();


 //3. ELEMETNS ARE ENABLED AND DISBALED
 await expect(page.getByText('The Kitchen')).toBeEnabled();//(clickable/interactive)
 await expect(page.getByText('The Kitchen')).not.toBeDisabled();//(greyed out/not interactive)


 //4. TEXT MATCHES VALUE OR NOT (CHECK TEXT)

 await expect(page.getByText('The Kitchen', { exact: true })).toHaveText('The Kitchen');
await expect(page.getByText('The Kitchen', { exact: true })).not.toHaveText('ABCD');

//5. element attribute (class, id or any attribute)
 const alertLink = page.getByRole('link', { name: 'Alert', exact: true }); 
const triggerAlertBtn = page.getByRole('button', { name: 'Trigger an Alert' });

// 5.1. Assert that the button is visible and ready
await expect(triggerAlertBtn).toBeVisible();

// 5.2. Click the actual button to trigger the browser alert
await triggerAlertBtn.click();

// Your assertion line
 // Check what the browser is actually looking at

await expect(page).toHaveURL(/kitchen\.applitools\.com/);
await page.pause()
await expect(page).toHaveScreenshot()
});
