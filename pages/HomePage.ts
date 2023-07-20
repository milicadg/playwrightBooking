import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    
    readonly signInButton: Locator;
    readonly header: Locator;
    readonly adminLink : Locator;
    readonly homePageLink: Locator;
    //Booking room
    readonly bookingCalendarNextButton: Locator;
    readonly bookingFirstNameField: Locator;
    readonly bookingLastNameField: Locator;
    readonly bookingEmailField: Locator;
    readonly bookingPhoneNumberField: Locator;
    readonly bookingBookButton: Locator;


    constructor(page: Page) {
        super(page);
        this.header = page.getByText('Welcome to Restful Booker Platform', {exact: true});
        this.adminLink = page.getByAltText('Link to admin page');
        this.homePageLink = page.getByAltText('Link to home page');

        this.bookingCalendarNextButton = page.getByRole('button', { name: 'Next' }).last();
        this.bookingFirstNameField = page.locator('input.room-firstname').last();
        this.bookingLastNameField = page.locator('input.room-lastname').last();
        this.bookingEmailField = page.locator('input.room-email').last();
        this.bookingPhoneNumberField = page.locator('input.room-phone').last();
        this.bookingBookButton = page.getByRole('button', { name: 'Book', exact: true }).last();

    }

    async goToAdminPanel() {
        await this.adminLink.waitFor();
        await this.adminLink.click();
    }

    async goToHomePage() {
        await this.homePageLink.click();
    }

    async selectBookingDates() {
        await this.bookingCalendarNextButton.click();
        const bookingCalendarStart = this.page.locator('.rbc-day-bg:not(.rbc-off-range-bg)').first();
        const bookingCalendarEnd = this.page.locator('.rbc-day-bg:not(.rbc-off-range-bg)').last();
        await bookingCalendarStart.hover();
        await this.page.mouse.down();
        await bookingCalendarEnd.hover();
        await this.page.mouse.up();
    }

    async clickBookRoomButton(roomName: string) {
        await this.page.locator(`//div[./div/img[contains(@alt,'${roomName}')]]//button`).last().click();
    }

    async bookRoom(roomName: string, firstName: string, lastName: string, email: string, phoneNumber: string) {
        await this.clickBookRoomButton(roomName);
        await this.fillBookingFields(firstName, lastName, email, phoneNumber);
        await this.selectBookingDates();
        await this.bookingBookButton.click();
    }

    async fillBookingFields(firstName: string, lastName: string, email: string, phoneNumber: string) {
        await this.bookingFirstNameField.type(firstName);
        await this.bookingLastNameField.type(lastName);
        await this.bookingEmailField.type(email);
        await this.bookingPhoneNumberField.type(phoneNumber);
      }
    

}