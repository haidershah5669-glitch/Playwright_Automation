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
//Visible/hidden

})


// import test, {page, expect} from '@playwright/test'
// test('assertions demo', async ({page}) => {
//    /// await page.goto('https://kitchen.applitools.com/')
//   // await page.pause()
// //ASSERTIONS
// //CHECK ELEMENT 
//  // await expect(page.getByRole('heading', { name: 'The Kitchen' })).toHaveCount(1);
// });

//   //const myButton =page.locator('#submit-button')

// // Test Case 2: Conditional Logic (The Kitchen Link)
// test('should click the kitchen link if the button is enabled', async ({ page }) => {
//     await page.goto('https://kitchen.applitools.com/');

//     const myButton = page.locator('#submit-button'); 
//     const kitchenLink = page.locator('text=The Kitchen');

//     if (await myButton.isEnabled()) {
//         await myButton.click();
//     }
//     else{
//       console.log("Button was NOT enabled, skipping click.");

//     }

//     // if (await kitchenLink.isVisible()) {
//     //     await kitchenLink.click();
//         await page.pause(); 
//   //  }
// });

// //   if (await myButton.isEnabled)){
// //     await myButton.click();
// //   }
// //   if (await page('Text=the Kitchen')){
// //      await page.locator('text=The Kitchen').click()
// //      await page.pause()
// //}
// //..............................................
// // import { test, expect } from '@playwright/test';

// // test('assertions demo', async ({ page }) => {
// //   // 1. Navigate to the page
// //   await page.goto('https://kitchen.applitools.com/');
  
// //   // 2. ASSERTIONS
// //   // Verify the heading is present exactly once
// //   await expect(page.getByRole('heading', { name: 'The Kitchen' })).toHaveCount(1);

// //   // 3. CONDITIONAL CHECK
// //   // Define the locator for the button
// //   const myButton = page.locator('#submit-button');

// //   // Correct syntax: await the function call isEnabled()
// //   if (await myButton.isEnabled()) {
// //     await myButton.click();
// //   }

// //   // 4. TEXT LOCATOR CHECK (Modern approach)
// //   const kitchenHeading = page.locator('text=The Kitchen');
  
// //   if (await kitchenHeading.isVisible()) {
// //     await kitchenHeading.click();
// //     await page.pause(); // Uncomment if you want to see the state here
// //   }
// // });