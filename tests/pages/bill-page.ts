import { Page, Locator, expect } from '@playwright/test';

export class BillPage {
  readonly page: Page;
  readonly pageName: Locator;
  readonly createBillButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageName = page.locator('#app > div > h2 > div');
    this.createBillButton = page.locator('#app > div > h2 > a')
  }

  async verifyBillDetails() {
    const element = this.page.locator('#app > div > div.clients > div:nth-last-child(1)');
  }
}
