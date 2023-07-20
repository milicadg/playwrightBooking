import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class NavigationBar extends BasePage {
    
    readonly logOut: Locator;

    constructor (page: Page) {
        super(page);
        this.logOut = page.getByText('Logout');
    }

    async Logout() {
        await this.logOut.click();
    }
}