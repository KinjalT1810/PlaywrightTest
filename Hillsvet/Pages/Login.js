// Pages/Login.js
import { expect } from '@playwright/test';
import testData from '../../data/test-data.json';

export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async login(url, email, password) {
    await this.page.goto(url);
    await this.page.locator('#email').fill(email);
    await this.page.locator('#password').fill(password);
    await this.page
      .locator("(//button[@class='button-v2 sign-up-login-btn is-primary'])[1]")
      .click();
    await expect(this.page.locator("//span[@class='welcome-user']")).toHaveText('Hey Kinjal,');
  }
}