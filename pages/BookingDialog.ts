import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class BookingDialog extends BasePage {
    readonly sucessfulBookingMessage : Locator;
    
    constructor (page: Page) {
        super(page);
        this.sucessfulBookingMessage = page.locator('//h3[text()="Booking Successful!"]');
    }

}