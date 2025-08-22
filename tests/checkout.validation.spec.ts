import { test, expect } from '@playwright/test';

//test for first name error
test('First Name Error', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  //Login steps
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  //Add item to cart and verify the cart badge is showing correctly
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(1);
  //continue the check out process
  await page.locator('[data-test="shopping-cart-link"]').click();
  //Go to checkout page and verify the page title is correct
  await page.locator('[data-test="checkout"]').click();
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  //Populate Last name and zip fields, leaving first name blank
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('Tester');
  await page.locator('[data-test="lastName"]').press('Tab');
  await page.locator('[data-test="postalCode"]').fill('90210');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="error"]').click();
  await expect(page.locator('[data-test="checkout-info-container"] div').filter({ hasText: 'Error: First Name is required' }).nth(2)).toBeVisible();

});

//test for last name error.
test('Last Name Error', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
    //Login steps
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    //Add item to cart and verify the cart badge is showing correctly
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(1);
    //continue the check out process
    await page.locator('[data-test="shopping-cart-link"]').click();
    //Go to checkout page and verify the page title is correct
    await page.locator('[data-test="checkout"]').click();
    await expect(page.locator('[data-test="title"]')).toBeVisible();
    //Populate Last name and zip fields, leaving first name blank
    await page.locator('[data-test="lastName"]').click();
    await page.locator('[data-test="lastName"]').fill('Tester');
    await page.locator('[data-test="lastName"]').press('Tab');
    await page.locator('[data-test="postalCode"]').fill('90210');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="checkout-info-container"] div').filter({ hasText: 'Error: First Name is required' }).nth(2).click();
});

//test for zipcode error
test('Zip Code Error', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
    //Login steps
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    //Add item to cart and verify the cart badge is showing correctly
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(1);
    //continue the check out process
    await page.locator('[data-test="shopping-cart-link"]').click();
    //Go to checkout page and verify the page title is correct
    await page.locator('[data-test="checkout"]').click();
    await expect(page.locator('[data-test="title"]')).toBeVisible();
    //Populate Last name and zip fields, leaving first name blank
    await page.locator('[data-test="firstName"]').click();
    await page.locator('[data-test="firstName"]').fill('Test');
    await page.locator('[data-test="firstName"]').press('Tab');
    await page.locator('[data-test="lastName"]').fill('Tester');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="checkout-info-container"] div').filter({ hasText: 'Error: Postal Code is required' }).nth(2)).toBeVisible();
});


// Generated test for using a for loop. Still learning for loops and wanted to write the test out manually.

// import { test, expect } from '@playwright/test';

// const cases = [
//   { field: 'First Name', values: { first: '', last: 'Doe', zip: '12345' }, expected: 'Error: First Name is required' },
//   { field: 'Last Name', values: { first: 'John', last: '', zip: '12345' }, expected: 'Error: Last Name is required' },
//   { field: 'ZIP', values: { first: 'John', last: 'Doe', zip: '' }, expected: 'Error: Postal Code is required' },
// ];

// test.describe('Checkout field validation @regression', () => {
//   for (const c of cases) {
//     test(`Missing ${c.field}`, async ({ page }) => {
//       await page.goto('/');
//       await page.getByPlaceholder('Username').fill('standard_user');
//       await page.getByPlaceholder('Password').fill('secret_sauce');
//       await page.getByRole('button', { name: 'Login' }).click();

//       // Add product → Cart → Checkout
//       await page.getByRole('button', { name: 'Add to cart', exact: true }).click();
//       await page.getByRole('link', { name: '1' }).click();
//       await page.getByRole('button', { name: 'Checkout' }).click();

//       // Fill form with missing field
//       await page.getByPlaceholder('First Name').fill(c.values.first);
//       await page.getByPlaceholder('Last Name').fill(c.values.last);
//       await page.getByPlaceholder('Zip/Postal Code').fill(c.values.zip);
//       await page.getByRole('button', { name: 'Continue' }).click();

//       // Assert error
//       await expect(page.locator('[data-test="error"]')).toHaveText(c.expected);
//     });
//   }
// });
