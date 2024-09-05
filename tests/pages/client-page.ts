import { Page, Locator, expect } from '@playwright/test';

export class ClientPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox');
    this.emailInput = page.locator('input[type="email"]');
    this.phoneInput = page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox');
    this.saveButton = page.getByText('Save');
  }

  async createClient(fullName: string, userEmail: string, userPhoneNo: string) {
    await this.nameInput.fill(fullName);
    await this.emailInput.fill(userEmail);
    await this.phoneInput.fill(userPhoneNo);
    await this.saveButton.click();
  }

  async verifyClientDetails(fullName: string, userEmail: string, userPhoneNo: string) {
    const element = this.page.locator('#app > div > div.clients > div:nth-last-child(1)');
    await expect(element).toContainText(fullName);
    await expect(element).toContainText(userEmail);
    await expect(element).toContainText(userPhoneNo);
  }
}