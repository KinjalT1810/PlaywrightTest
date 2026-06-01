// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/Login.js';
import testData from '../data/test-data.json';

test('Login Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(testData.url, testData.emailid, testData.password);
});

test('Login Test - Incorrect Email', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto(testData.url);
  await page.locator('#email').fill('incorrect@email.com');
  await page.locator('#password').fill(testData.password);
  await page
    .locator("(//button[@class='button-v2 sign-up-login-btn is-primary'])[1]")
    .click();
  
  // Expect login to fail - welcome message should not appear
  await expect(page.locator("//span[@class='welcome-user']")).not.toBeVisible();
});