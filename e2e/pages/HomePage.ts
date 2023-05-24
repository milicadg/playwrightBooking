import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
    
    readonly signInButton: Locator;
    readonly header: Locator;
    readonly adminLink : Locator;

    constructor(page: Page) {
        super(page);
        this.header = page.getByText('Welcome to Restful Booker Platform', {exact: true});
        this.adminLink = page.getByAltText('Link to admin page');
    }

    async goToAdminPanel() {
        await this.adminLink.click();
    }

}