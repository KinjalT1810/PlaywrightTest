// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/Login.js'; 
import testData from '../data/test-data.json';


test('APM', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testData.url, testData.emailid, testData.password); 
    await page.locator("//a[normalize-space()='']//*[name()='svg']").click();
    await page.locator("//div[contains(text(),'Span With Status Error')]").textContent();
});
