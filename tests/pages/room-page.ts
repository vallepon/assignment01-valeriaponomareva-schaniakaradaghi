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
        this.categoryElement = page.getByRole('combobox');
        this.numberInput = page.locator('input[name="number"]'); // Example selector
        this.floorInput = page.locator('select[name="floor"]'); // Example selector
        this.availableCheckbox = page.locator('input[name="available"]'); // Example selector
        this.priceInput = page.locator('input[name="price"]'); // Example selector
        this.featuresSelect = page.getByRole('listbox', { name: 'Features' }); // Funktioner (Ctrl/Cmd + klick)
        this.saveButton = page.getByRole('button', { name: 'Save' }); // Example selector
     }

        async fillOutCreateRoomsForm() {
            const number = faker.number.int({ min: 100, max: 999 }).toString();
            const floorNumber = faker.number.int({ min: 0, max: 10}).toString()
            const roomPrice = faker.finance.amount({ min: 100000, max: 50000000});
            const features = ['Balcony', 'Ensuite', 'Sea View', 'Penthouse'];
            const selectedFeatures = features.filter(() => Math.random() > 0.5); // Slumpmässigt välj 2-3 funktioner
            for (const feature of selectedFeatures) {
            await this.featuresSelect.selectOption({ label: feature });
    }


            await this.categoryElement.selectOption({ index: 1 }); // Selecting single room option
            await this.numberInput.fill(number);
            await this.floorInput.fill(number);
            await this.availableCheckbox.check();
            await this.priceInput.fill(roomPrice);
        
            await this.saveButton.click();
          }
          
        }