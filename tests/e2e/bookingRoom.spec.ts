import { faker } from '@faker-js/faker';

import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Manipulate with booking', async () => {
  
  const roomName: string = faker.number.int({ min: 100, max: 999 }).toString();
  const roomType = 'Twin';
  const roomPrice = '300';
  const roomAccessible = true;
  let homePage: HomePage;
  
  test('Testing crete booking with particular room type', async ({ request, page } ) => {
    const path = '/room';
    const response = await request.post(`${path}/`, {
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
    const createdRoomId = await (responseText.roomid);
    
    homePage = new HomePage(page);
    await homePage.goToApp();
    
    console.log('created room:' + createdRoomId);
  }); 
    
});