import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';

export class SendingMessagePage extends BasePage {

    readonly contactName: Locator;
    readonly contactEmail: Locator;
    readonly contactPhone: Locator;
    readonly contactSubject: Locator;
    readonly contactDescription: Locator;
    readonly submit: Locator;
    readonly thanksMessage: Locator;
    readonly beBackMessage: Locator;
    readonly sentSubject: Locator;
    readonly asSoonMessage: Locator;

    constructor (page: Page) {
        super(page);
        this.contactName = page.getByTestId('ContactName');
        this.contactEmail = page.getByTestId('ContactEmail');
        this.contactPhone = page.getByTestId('ContactPhone');
        this.contactSubject = page.getByTestId('ContactSubject');
        this.contactDescription = page.getByTestId('ContactDescription');
        this.submit = page.locator('#submitContact');
        this.thanksMessage = page.locator('//div[@class="row contact"]//div[2]//h2');
        this.beBackMessage = page.locator('//div[@class="row contact"]//div[2]//p[1]');
        this.sentSubject = page.locator('//div[@class="row contact"]//div[2]//p[2]');
        this.asSoonMessage = page.locator('//div[@class="row contact"]//div[2]//p[3]');
    }

    async sendMessage(name: string, email: string, phone: string, subject: string, description: string) {
        await this.contactName.fill(name);
        await this.contactPhone.fill(phone);
        await this.contactEmail.fill(email);
        await this.contactSubject.fill(subject);
        await this.contactDescription.fill(description);
        await this.submit.click();
    }
}