import { Page, Locator, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CreateRoomPage {
    //Attributes
    readonly page: Page;
    readonly categoryElement: Locator; 
    readonly numberInput: Locator;
    readonly floorInput: Locator;
    readonly availableCheckbox: Locator;
    readonly priceInput: Locator;
    readonly featuresSelect: Locator;
    readonly saveButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.categoryElement = page.locator('#app > div > div:nth-child(2) > div:nth-child(1) > select');
        this.numberInput = page.locator('#app > div > div:nth-child(2) > div:nth-child(2) > input[type=number]'); // Example selector
        this.floorInput = page.locator('#app > div > div:nth-child(2) > div:nth-child(3) > input[type=number]'); // Example selector
        this.availableCheckbox = page.locator('#app > div > div:nth-child(2) > div:nth-child(4) > div'); // Example selector
        this.priceInput = page.locator('#app > div > div:nth-child(2) > div:nth-child(5) > input[type=number]');
        this.featuresSelect = page.locator('#app > div > div:nth-child(2) > div:nth-child(6) > select'); // Funktioner (Ctrl/Cmd + klick)
        this.saveButton = page.locator('#app > div > div.actions > a.btn.blue'); // Example selector
     }

        async fillOutCreateRoomsForm() {
            const number = faker.number.int({ min: 100, max: 999 }).toString();
            const floorNumber = faker.number.int({ min: 0, max: 10}).toString()
            const roomPrice = faker.number.int({ min: 100000, max: 50000000 }).toString();
            const features = ['Balcony', 'Ensuite', 'Sea View', 'Penthouse'];
            const selectedFeatures = features.filter(() => Math.random()); // Slumpmässigt välj 2-3 funktioner
            for (const feature of selectedFeatures) {
            await this.featuresSelect.selectOption({ label: feature });
    }


            await this.categoryElement.selectOption({ index: 1 }); // Selecting single room option
            await this.numberInput.fill(number);
            await this.floorInput.fill(number);
            await this.availableCheckbox.click();
            await this.priceInput.fill(roomPrice);
            await this.saveButton.click();
          }
          
        }