import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { ClientPage } from './pages/client-page';
import { faker } from '@faker-js/faker';

test.describe('Test suite 01', () => {
  test('Test case 01', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`)
    //await loginPage.performLogin('akjdgakjsda','asdasasafsd')
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await dashboardPage.performLogout();
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible(); 
    await page.waitForTimeout(5000);
  });

  test('Test case 02', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const dashboardpage = new DashboardPage(page);
    const clientpage = new ClientPage(page);

    await loginpage.goto();
    await loginpage.performLogin(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();

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
});