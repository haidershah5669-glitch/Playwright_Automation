import test, {page, expect} from '@playwright/test'
//import { waitForDebugger } from 'node:inspector'
test ('Asserstion demo', async({page}) => {
 await page.goto('https://kitchen.applitools.com/')  
 await page.pause()

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


 //3. TEXT MATCHES VALUE OR NOT (CHECK TEXT)
 await expect(page.locator('text=The Kitchen')).toHaveText('The Kitchen');
 await expect(page.locator('text=The Kitchen')).not.toHaveText('ABCD');

 //4. ELEMENT ATTRIBUTE
// await expect(page.getByRole('link', { name: /alert/i })).toHaveAttribute('href', '/alerts.html');
// //await expect(page.getByRole('link',{name:'Alert'})).toHaveAttribute('href','/alerts.html');
// await expect(page.getByRole('link', { name: 'Alert' })).not.toHaveAttribute('class', /.*/);   

// 1. First, check the attributes of the link while you are still on the page
await expect(page.getByRole('link', { name: 'Alert' })).toHaveAttribute('href', '/alerts.html');
await expect(page.getByRole('link', { name: 'Alert' })).not.toHaveAttribute('class', /.*/);

// 2. Then, perform the click action afterward
await page.getByRole('link', { name: 'Alert' }).click();
});
