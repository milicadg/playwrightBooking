import { test, expect } from '@playwright/test';
import { faker} from '@faker-js/faker';
import { HomePage } from '../../pages/HomePage';
import { SendingMessagePage } from '../../pages/SendingMessagePage';

test.describe('Sending message', async () => {
    let homePage: HomePage;
    let sendMessagePage: SendingMessagePage;
    const firstName = faker.person.firstName('female');
    const lastName = faker.person.lastName('female');
    const contactName = firstName + ' ' + lastName;
    const email = faker.internet.exampleEmail({firstName, lastName});
    const phone = faker.phone.number(); 
    const msubject = 'Some subject string ' + firstName;
    const description = 'Some description for sending message';
    const path = '/message';
    
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        sendMessagePage = new SendingMessagePage(page);
        homePage.goToApp();
        await expect(homePage.header).toBeVisible();
        await homePage.goToHomePage();
    });

    test('Send message', async ({request }) => {
        const message: [string, string, string, string,string] = [contactName, phone, email, msubject, description];
        await sendMessagePage.sendMessage(message);
        await expect(sendMessagePage.thanksMessage).toHaveText('Thanks for getting in touch ' + contactName +'!');
        await expect(sendMessagePage.beBackMessage).toHaveText('We\'ll get back to you about');
        await expect(sendMessagePage.sentSubject).toHaveText(msubject);
        await expect(sendMessagePage.asSoonMessage).toHaveText('as soon as possible.');
        
        let response = await request.get(`${path}/`, {});
        expect(response.status()).toBe(200);
        let responseJSON = JSON.parse(await response.text());
        let numberOfMessages = 0;
        for (const index in responseJSON.messages) {
            numberOfMessages++;
        }
        const messageId = await (responseJSON.messages[numberOfMessages-1]).id;
        response = await request.get(`${path}/${messageId}`, {});  
        expect(response.status()).toBe(200);
        responseJSON = JSON.parse(await response.text());
        expect(responseJSON.subject).toBe(msubject);
    });

    test('Empty name when sending message',async () => {
        const emptyField: [string, string, string, string, string] = ['', phone, email, msubject, description];
        await sendMessagePage.sendMessage(emptyField);
        await expect(sendMessagePage.emptyErrorMessage).toHaveText('Name may not be blank');
    });

    test('Empty email when sending message',async () => {
        const emptyField: [string, string, string, string, string] = [contactName, phone, '', msubject, description];
        await sendMessagePage.sendMessage(emptyField);
        await expect(sendMessagePage.emptyErrorMessage).toHaveText('Email may not be blank');
    });

    test('Empty phone when sending message',async () => {
        const emptyField: [string, string, string, string, string] = [contactName, '', email, msubject, description];
        await sendMessagePage.sendMessage(emptyField);
        await expect(sendMessagePage.emptyErrorMessage.nth(0)).toBeVisible();
        await expect(sendMessagePage.emptyErrorMessage.nth(1)).toBeVisible();
    });
});