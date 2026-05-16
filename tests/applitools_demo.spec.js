import{test, expect} from '@playwright/test'
test('demo login test1' , async({page}) =>{
await page.goto('https://demo.applitools.com/')
//await page.pause()
  await page.getByRole('textbox', { name: 'Enter your username' }).fill('haider');
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('1234');
  await page.getByRole('test=sign in' , {timeout:4000})
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.pause()
});

test('demo login test 2' , async({page}) => {
await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
await page.pause()

      })
      test.only('demo login test 3' , async({page}) => {
        await page.pause()
      });

      //Assertions.........
      //its like "checks"
      //check actual=expected

    //Assertions in playwright
    //playwright test uses expect library for test assertions.
    //ADD assertions
    //.1 checks 0r verifications text, element, element values
    //2. check actual=expected

    // how to check if the elements are:
    //1. present/not present
    //2. visible/hidden
    //3. enabled/disabled
    //4. test matches/or not to any values
    //5. element attribute (class, id or any attribute)
    //6. url
    //7. title
    //8. page mateches screenshot (page looks, pixels, colors)
    //9. soft assentions (failures in execution, we use soft assertions so script will not fail)