import { test, expect } from '@playwright/test'; 
import userData from '../../data/users.json';

test.describe.skip('Authentication api', async () => {
  const authFile = 'playwright/.auth/userAuth.json';
  const path = '/auth';
  
  
  test('Authentication test', async ({ request }) => {

    const response = await request.post(`${path}/login/`, {
      data: {
        'username': userData.ApiUser.username,
        'password': userData.ApiUser.password
      }
    });
    await request.storageState({ path: authFile });
    console.log('response status text milica:' + response.body());
    expect(response.status()).toBe(200);
  });

}); 