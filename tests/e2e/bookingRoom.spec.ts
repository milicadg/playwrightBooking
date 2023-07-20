import { faker } from '@faker-js/faker';

import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { RoomApi } from '../../api/RoomApi';
import { BookingDialog } from '../../pages/BookingDialog';

test.describe('Manipulate with booking', async () => {
  
  const roomName: string = faker.number.int({ min: 100, max: 999 }).toString();
  const roomType = 'Twin';
  const roomPrice = '300';
  const roomAccessible = true;
  const imagePath = 'https://www.mwtestconsultancy.co.uk/img/room1.jpg';
  const description = 'Please enter a description for this room';
  const features = ['WiFi', 'Radio'];

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.exampleEmail({firstName, lastName});
  const phoneNumber = faker.phone.number();
  let homePage: HomePage;
  let roomApi : RoomApi;
  let successfulDialog : BookingDialog;
  
  test('Testing crete booking with particular room type', async ({ request, page } ) => {
    roomApi = new RoomApi(request);
    let response = roomApi.createRoom(roomName, roomType, roomAccessible, imagePath, description, features, roomPrice);
    expect((await response).status()).toBe(201);
    const responseText = JSON.parse(await (await response).text());
    const createdRoomId = await (responseText.roomid);
    homePage = new HomePage(page);
    await homePage.goToApp();
    await homePage.bookRoom(roomName, firstName, lastName, email, phoneNumber);

    successfulDialog = new BookingDialog(page);
    expect(successfulDialog.sucessfulBookingMessage).toBeTruthy();

    response = roomApi.deleteRoom(createdRoomId);
    expect((await response).status()).toBe(202);
  }); 
    
});