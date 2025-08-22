import { test, expect } from '@playwright/test';

test('valid login redirects to Products @smoke', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText('Products');
  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});
