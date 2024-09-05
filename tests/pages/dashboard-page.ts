import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  //Attributes
  readonly page: Page;
  readonly logoutButton: Locator; 

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
  }

  async navigateToClients() {
    await this.page.locator('#app > div > div > div:nth-child(2) > a').click();
  }
   async performLogout() {
    await this.logoutButton.click();
  }
}