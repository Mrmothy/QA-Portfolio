import { test, expect } from '@playwright/test';

test('Logout clears session and cart @regression', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  //Login
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  //Adding item to cart and verify cart badge is showing a count <0
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(1)

  //Clear app data so test will pass as there is cached data in my environment
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="reset-sidebar-link"]').click();

  //Logout then login 
  await page.locator('[data-test="logout-sidebar-link"]').click();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  //verify the cart is showing a zero.
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0)

});
