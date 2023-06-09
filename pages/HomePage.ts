import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    
    readonly signInButton: Locator;
    readonly header: Locator;
    readonly adminLink : Locator;
    readonly homePageLink: Locator;

    constructor(page: Page) {
        super(page);
        this.header = page.getByText('Welcome to Restful Booker Platform', {exact: true});
        this.adminLink = page.getByAltText('Link to admin page');
        this.homePageLink = page.getByAltText('Link to home page');
    }

    async goToAdminPanel() {
        await this.adminLink.waitFor();
        await this.adminLink.click();
    }

    async goToHomePage() {
        await this.homePageLink.click();
    }

}