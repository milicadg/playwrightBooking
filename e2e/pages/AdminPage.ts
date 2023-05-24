import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdminPage extends BasePage {
    
    readonly header: Locator;
    readonly usernameLocator: Locator;
    readonly passwordLocator: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.header = page.getByTestId('login-header');
        this.usernameLocator = page.getByTestId('username');
        this.passwordLocator = page.getByTestId('password');
        this.loginButton = page.locator('#doLogin');
    }

    async logIn(username: string, password: string) {
        await this.usernameLocator.fill(username);
        await this.passwordLocator.fill(password);
        await this.loginButton.click();
    }

   
}