import { test, expect } from '@playwright/test'; 
import { faker } from '@faker-js/faker';
import { BookingManagementPage } from '../../pages/BookingManagementPage';
import { RoomPage } from '../../pages/RoomPage';
import { EditRoomPage } from '../../pages/EditRoomPage';

test.describe('Update room E2E', async () => {

  let path = '/auth';
  let bookingManagementPage: BookingManagementPage;
  let roomPage: RoomPage;
  let editRoomPage: EditRoomPage;
  const roomName = faker.number.int.toString(); //  number(300).int.toLocaleString();
  let roomType = 'Twin';
  let roomPrice = '300';
  let roomAccessible = true;
 
  test('Update room test', async ({ request, page }) => {
    bookingManagementPage = new BookingManagementPage(page, roomName);
    bookingManagementPage.goToBookingManagement();
    await expect(bookingManagementPage.managementHeader).toBeVisible();

    path = '/room';
    //console.log(`milica: ${path}/`);
    let response = await request.post(`${path}/`, {
      data: {
        'roomName': roomName,
        'type': roomType,
        'accessible': roomAccessible,
        'image': 'https://www.mwtestconsultancy.co.uk/img/room1.jpg',
        'description': 'Please enter a description for this room',
        'features': [
            'WiFi',
            'TV',
            'Refreshments'
        ],
        'roomPrice': roomPrice
      }
    });
    expect(response.status()).toBe(201);
    const responseText = JSON.parse(await response.text());
    const creaedRoomId = await (responseText.roomid);
    expect(responseText.roomName).toBe(roomName);

    roomPage = new RoomPage(page, creaedRoomId, roomName);
    await roomPage.goToRoom(creaedRoomId);
    await expect(roomPage.roomIdHeader).toHaveText('Room: ' + roomName);
    await roomPage.editRoom();

    //Edit room values
    editRoomPage = new EditRoomPage(page, roomName);
    
    const editRoomNameValue = faker.number.int({ min: 100, max: 999 }).toString();
    roomType = 'Double';
    roomPrice = '300';
    roomAccessible = true;
    const image = 'https://images.pexels.com/photos/11857305/pexels-photo-11857305.jpeg';
    const description = faker.lorem.text();

    const hasFeatures: [boolean, boolean, boolean, boolean, boolean, boolean] = [true, false, false, true, true, true];
    await editRoomPage.editRoom(editRoomNameValue, roomType, roomAccessible, roomPrice, hasFeatures, image, description);
    roomPage = new RoomPage(page, creaedRoomId, editRoomNameValue);
    await expect(roomPage.roomIdHeader).toHaveText('Room: ' + editRoomNameValue);
    await expect(roomPage.roomType).toHaveText(roomType);
   
    response = await request.delete(`${path}/${creaedRoomId}`);
    expect(response.status()).toBe(202);

  });
});