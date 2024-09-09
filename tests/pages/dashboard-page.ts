import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  //Attributes
  readonly page: Page;
  readonly logoutButton: Locator; 
  readonly createClient: Locator;
  readonly createRoom: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createClient = page.getByRole('link', { name: 'Create Client' });
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
  }

  async navigateToClients() {
    await this.page.locator('#app > div > div > div:nth-child(2) > a').click();
    await this.createClient.click();

  }

  async navigateToRooms() {
    this.page.locator('#app > div > div > div:nth-child(1) > a').click;
    await this.createRoom.click();

  }

   async performLogout() {
    await this.logoutButton.click();
  }
}