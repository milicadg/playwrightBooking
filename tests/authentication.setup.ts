import { test as setup, APIResponse, expect } from '@playwright/test';
import userData from '../data/users.json';
import { AdminPage } from '../pages/AdminPage';
import { HomePage } from '../pages/HomePage';

const authFile = 'playwright/.auth/userAuth.json';
let response : APIResponse;
const path = '/auth';
let homePage: HomePage;
let adminPage: AdminPage;

setup('authenticate', async ({ request, page }) => {

  await page.context().clearCookies();
  homePage = new HomePage(page);
  adminPage = new AdminPage(page);
    
  await homePage.goToApp();
  await homePage.goToAdminPanel();
  await adminPage.logIn(userData.User.username, userData.User.password);
    
  response = await request.post(`${path}/login/`, {
    data: {
      'username': userData.ApiUser.username,
      'password': userData.ApiUser.password
    }
  });
   
  console.log('Status of the response: ' + response.status());
  console.log('Status of the response2: ' + response.statusText());
  await page.context().storageState({ path: authFile });
});