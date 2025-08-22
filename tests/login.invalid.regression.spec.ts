import { test, expect } from '@playwright/test';

const cases = [
  {
    title: 'both invalid',
    username: 'invalid_user',
    password: 'wrong_pass',
    expectedError: 'Epic sadface: Username and password do not match any user in this service',
  },
  {
    title: 'valid username, wrong password',
    username: 'standard_user',
    password: 'badpass',
    expectedError: 'Epic sadface: Username and password do not match any user in this service',
  },
  {
    title: 'missing username',
    username: '',
    password: 'secret_sauce',
    expectedError: 'Epic sadface: Username is required',
  },
  {
    title: 'missing password',
    username: 'standard_user',
    password: '',
    expectedError: 'Epic sadface: Password is required',
  },
  {
    title: 'both empty',
    username: '',
    password: '',
    expectedError: 'Epic sadface: Username is required',
  },
];

test.describe('Invalid login @regression', () => {
  for (const c of cases) {
    test(`invalid login — ${c.title} @regression`, async ({ page }) => {
      await page.goto('/');

      // Username (only fill if not undefined)
      if (c.username !== undefined) {
        await page.getByPlaceholder('Username').fill(c.username);
      }
      // Password (only fill if not undefined)
      if (c.password !== undefined) {
        await page.getByPlaceholder('Password').fill(c.password);
      }

      await page.getByRole('button', { name: 'Login' }).click();

      const error = page.locator('[data-test="error"]');
      await expect(error).toBeVisible();
      await expect(error).toHaveText(c.expectedError);
      await expect(page).not.toHaveURL(/\/inventory\.html$/);
    });
  }
});