import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { ClientPage } from './pages/client-page';
import { CreateRoomPage } from './pages/room-page';
import { CreateBillPage } from './pages/bill-page';
import { faker } from '@faker-js/faker';

test.describe('Test suite 01', () => {
  test('Test case 01', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const dashboardpage = new DashboardPage(page);

    await loginpage.goto();
    await loginpage.performLogin(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await dashboardpage.performLogout();

    //await page.waitForTimeout(5000);
  });

  test('Test case 02', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const dashboardpage = new DashboardPage(page);
    const clientpage = new ClientPage(page);

    await loginpage.goto();
    await loginpage.performLogin(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await page.waitForTimeout(5000);
    await dashboardpage.navigateToClients();
    await expect(page.getByRole('heading', { name: 'New Client' })).toBeVisible();

    const fullName = faker.person.fullName();
    const userEmail = faker.internet.email();
    const userPhoneNo = faker.phone.number();

    await clientpage.createClient(fullName, userEmail, userPhoneNo);
    await clientpage.verifyClientDetails(fullName, userEmail, userPhoneNo);

    await dashboardpage.performLogout();
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });

  test('Test case 03', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const dashboardpage = new DashboardPage(page);
    const createRoomPage = new CreateRoomPage(page);
  
    await loginpage.goto();
    await loginpage.performLogin(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();

    await dashboardpage.navigateToRooms();
    await expect(page.getByRole('heading', { name: 'New Room' })).toBeVisible();
  
    await createRoomPage.fillOutCreateRoomsForm();
    await expect(page).toHaveURL('http://localhost:3000/rooms');
  });
  
  test('Test case 04', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const dashboardpage = new DashboardPage(page);
    const createBillPage = new CreateBillPage(page);
  
    await loginpage.goto();
    await loginpage.performLogin(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();

    await dashboardpage.navigateToBills();
    await page.waitForTimeout(5000);
    await expect(page.getByRole('heading', { name: 'New Bill' })).toBeVisible();
  
    await createBillPage.fillOutCreateBillsForm();
    await expect(page).toHaveURL('http://localhost:3000/bills');
  });
  
});
