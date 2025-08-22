import { test, expect } from '@playwright/test';

test.describe('Cart add & remove @smoke @regression', () => {
  test('Add and remove item from product page', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    //Login
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    //Add item to cart and verify the cart badge updated correctly
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(1);

    //Remove item from cart and verify the cart badge updates correctly
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  });
});