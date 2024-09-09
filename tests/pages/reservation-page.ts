import { type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CreateReservationPage {
    readonly page: Page;
    readonly startInput: Locator;
    readonly endInput: Locator;
    readonly clientSelect: Locator;
    readonly roomSelect: Locator;
    readonly billSelect: Locator;
    readonly saveButton: Locator;
  
    constructor(page: Page) {
        this.page = page;

        this.startInput = page.locator('#app > div > div:nth-child(2) > div:nth-child(1) > input[type=text]');
        this.endInput = page.locator('#app > div > div:nth-child(2) > div:nth-child(2) > input[type=text]');        
        this.clientSelect = page.locator('#app > div > div:nth-child(2) > div:nth-child(3) > select')
        this.roomSelect = page.locator('#app > div > div:nth-child(2) > div:nth-child(4) > select')
        this.billSelect = page.locator('#app > div > div:nth-child(2) > div:nth-child(5) > select')
        this.saveButton = page.locator('#app > div > div.actions > a.btn.blue');

    }

    async fillOutCreateReservationsForm() {

        const startDate = faker.date.future();
        const endDate = faker.date.future();

        const startDateString = startDate.toISOString().split('T')[0];
        const endDateString = endDate.toISOString().split('T')[0];


        const clients = ['Client 1', 'Client 2', 'Client 3'];
        const rooms = ['Room 1', 'Room 2', 'Room 3'];
        const bills = ['Bill 1', 'Bill 2', 'Bill 3'];
        
        const selectedClient = faker.helpers.arrayElement(clients);
        const selectedRoom = faker.helpers.arrayElement(rooms);
        const selectedBill = faker.helpers.arrayElement(bills);

        await this.startInput.fill(startDateString);
        await this.endInput.fill(endDateString);
        await this.clientSelect.selectOption({ label: selectedClient });
        await this.roomSelect.selectOption({ label: selectedRoom });
        await this.billSelect.selectOption({ label: selectedBill });

        await this.saveButton.click();
    }
    
}
