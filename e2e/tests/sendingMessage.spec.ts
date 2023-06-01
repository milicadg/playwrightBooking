import { test, expect } from '@playwright/test';
import faker, { } from 'faker';
import { HomePage } from '../pages/HomePage';
import { SendingMessagePage } from '../pages/SendingMessagePage';

test.describe('Sending message', async () => {
    let homePage: HomePage;
    let sendMessagePage: SendingMessagePage;
    const firstName = faker.name.firstName('female');
    const lastName = faker.name.lastName('female');
    const contactName = firstName + ' ' + lastName;
    const email = faker.internet.exampleEmail(firstName, lastName);
    const phone = faker.phone.phoneNumber();
    const subject = 'Some subject string';
    const description = 'Some description for sending message';
    
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        sendMessagePage = new SendingMessagePage(page);
        homePage.goToApp();
        await expect(homePage.header).toBeVisible();
        await homePage.goToHomePage();
    });

    test('Send message', async () => {
        await sendMessagePage.sendMessage(contactName, email, phone, subject, description);
        await expect(sendMessagePage.thanksMessage).toHaveText('Thanks for getting in touch ' + contactName +'!');
        await expect(sendMessagePage.beBackMessage).toHaveText('We\'ll get back to you about');
        await expect(sendMessagePage.sentSubject).toHaveText(subject);
        await expect(sendMessagePage.asSoonMessage).toHaveText('as soon as possible.');
    });
});