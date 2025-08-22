import { test, expect } from '@playwright/test';

test('Successful checkout shows confirmation @smoke', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  //login 
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  
  //Add item to cart and verify cart badge is showing correct amount
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
  await page.locator('[data-test="shopping-cart-link"]').click();
  
  //Verify that you landed on the check out page
  await page.locator('[data-test="checkout"]').click();
  await expect(page.locator('[data-test="title"]')).toBeVisible();

  //Input valid data in to required fields
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('Test');
  await page.locator('[data-test="firstName"]').press('Tab');
  await page.locator('[data-test="lastName"]').fill('Tester');
  await page.locator('[data-test="lastName"]').press('Tab');
  await page.locator('[data-test="postalCode"]').fill('90210');
  await page.locator('[data-test="continue"]').click();

  //Verify landing on the checkout overview page and total is shown and a finish button is visible
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="total-label"]')).toBeVisible();
  await expect(page.locator('[data-test="finish"]')).toBeVisible();
  
  TODO: //Learning how to add a check to make sure that the total is showing a value greater than 0

  // const count = await expect (page.locator('.total-label')).toHaveCount(0);
  // expect(count).toBeGreaterThan(0);

  //Finish out the check out process and validate landing on the completion page with the Thank you title.
  await page.locator('[data-test="finish"]').click();
  await expect(page.locator('[data-test="complete-header"]')).toBeVisible();

});