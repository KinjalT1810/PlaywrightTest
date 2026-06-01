import { test, expect } from '@playwright/test';
import testData from '../../data/test-data.json';
import { loginLocators } from '../Locators/loginLocators.js';

 test.skip('Invalid Login Test', async ({ page }) => {
    await page.goto(testData.LoginURL);
    // await page.pause();
    await page.getByRole('button', { name: 'Accept All' }).click();
    await page.getByRole(loginLocators.loginBtn).click();
    await page.getByRole(loginLocators.emailInput).click();
    await page.getByRole(loginLocators.emailInput).fill("kinjal@gmail");
    await page.getByRole(loginLocators.passwordInput).click();
    await page.getByRole(loginLocators.passwordInput).fill("kinjal123");
    await page.keyboard.press('Enter');
    await expect(page.getByRole(loginLocators.rememberMeCheckbox)).toBeChecked();
    await expect(page.getByRole(loginLocators.signInBtn)).toBeEnabled();
    await page.getByRole(loginLocators.signInBtn).click();
    await expect(page.getByText('Invalid login or password')).toBeVisible();
});

test.only('Valid Login Test', async ({ page }) => {
    await page.goto(testData.LoginURL);
    await page.getByRole('button', { name: 'Accept All' }).click(); 
    await page.getByRole(loginLocators.searchIcon).click();

});