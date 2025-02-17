import { test } from '@playwright/test';

test('Check environment variables', async ({ page }) => {
  await page.goto('/');
  console.log('BASE_URL:', process.env.BASE_URL);
  console.log('USER_NAME:', process.env.LOGIN);
  console.log('PASSWORD:', process.env.PASSWORD);
 
});
