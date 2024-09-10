import { Page, Locator, expect } from '@playwright/test';

export class ClientPage {
  readonly page: Page;
  readonly pageName: Locator;
  readonly createClientButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageName = page.locator('#app > div > h2 > div');
    this.createClientButton = page.locator('#app > div > h2 > a')
  }

  async verifyClientDetails(fullName: string, userEmail: string, userPhoneNo: string) {
    const element = this.page.locator('#app > div > div.clients > div:nth-last-child(1)');
    await expect(element).toContainText(fullName);
    await expect(element).toContainText(userEmail);
    await expect(element).toContainText(userPhoneNo);
  }
}