import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BookingManagementPage } from '../../pages/BookingManagementPage';

test.describe('Create room page', async () => {
    let bookingManagementPage: BookingManagementPage;
    const roomName = faker.number.int({ min: 100, max: 999 }).toString();
    const roomType = 'Twin';
    let roomAccessible = false;
    const roomPrice = '300';
    
   test.beforeEach(async ({ page }) => {
        bookingManagementPage = new BookingManagementPage(page, roomName);
        bookingManagementPage.goToBookingManagement();
   });

    test('Create room', async ({  }) => {
        roomAccessible = true;
        const hasFeatures: [boolean, boolean, boolean, boolean, boolean, boolean] = [false, true, true, false, false, false];
        //create room and check all entered values are stored
        await bookingManagementPage.createRoom(roomName, roomType, roomAccessible, roomPrice, hasFeatures);
        await expect(bookingManagementPage.createdRoomName).toHaveText(roomName);
        await expect(bookingManagementPage.createdRoomType).toHaveText(roomType);
        await expect(bookingManagementPage.createdRoomAccessible).toHaveText('true');
        await expect(bookingManagementPage.createdRoomPrice).toHaveText(roomPrice);
        await expect(bookingManagementPage.createdRoomDetails).toHaveText('TV, Radio');        
    });

    test('Price is mandatory', async ({  }) => {
        roomAccessible = true;
        const hasFeatures: [boolean, boolean, boolean, boolean, boolean, boolean] = [false, true, true, false, false, false];
        //create room and check all entered values are stored
        await bookingManagementPage.createRoom(roomName, roomType, roomAccessible, roomPrice, hasFeatures);
        expect(bookingManagementPage.errorMessage).toBeTruthy();      
     });
});