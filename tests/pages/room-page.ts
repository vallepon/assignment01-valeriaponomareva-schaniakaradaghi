import { Page, Locator, expect } from '@playwright/test';

export class RoomPage {
  readonly page: Page;
  readonly pageName: Locator;
  readonly createRoomButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageName = page.locator('#app > div > h2 > div');
    this.createRoomButton = page.locator('#app > div > h2 > a')
  }

/*  async verifyRoomDetails(number: string, floorNumber: string, roomPrice: string) {
    const element = this.page.locator('#app > div > div.clients > div:nth-last-child(1)');
    await expect(element).toContainText(number);
    await expect(element).toContainText(floorNumber);
    await expect(element).toContainText(roomPrice);
  }*/
}