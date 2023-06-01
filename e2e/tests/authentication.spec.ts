import { test, expect } from '@playwright/test';
import faker, { } from 'faker';
import userData from '../../data/users.json';
import { HomePage } from '../pages/HomePage';
import { AdminPage } from '../pages/AdminPage';
import { BookingManagementPage } from '../pages/BookingManagementPage';

test.describe('Authentication page', async () => {
    let homePage: HomePage;
    let adminPage: AdminPage;
    let bookingManagementPage: BookingManagementPage;
    const roomName = faker.datatype.number(300).toLocaleString();
    const roomType = 'Twin';
    let roomAccessible = false;
    const roomPrice = '300';
    
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        adminPage = new AdminPage(page);
        bookingManagementPage = new BookingManagementPage(page, roomName);

        //Open application and navigate to admin panel
        homePage.goToApp();
        await expect(homePage.header).toBeVisible();
        await homePage.goToAdminPanel();
        await expect(adminPage.header).toHaveText('Log into your account');
    });

    test('Create room', async () => {
        await adminPage.logIn(userData.User.username, userData.User.password);
        await expect(bookingManagementPage.managementHeader).toBeVisible();
        //we are creating accessible room
        roomAccessible = true;
        const hasFeatures: [boolean, boolean, boolean, boolean, boolean, boolean] = [false, true, true, false, false, false];
        //create room and check all entered values are stored
        await bookingManagementPage.createRoom(roomName, roomType, roomAccessible, roomPrice, hasFeatures);
        await expect(bookingManagementPage.createdRoomName).toHaveText(roomName);
        await expect(bookingManagementPage.createdRoomType).toHaveText(roomType);
        await expect(bookingManagementPage.createdRoomAccessible).toHaveText('true');
        await expect(bookingManagementPage.createdRoomPrice).toHaveText(roomPrice);
        await expect(bookingManagementPage.createdRoomDetails).toHaveText('TV, Radio, nesto');        
    });
});