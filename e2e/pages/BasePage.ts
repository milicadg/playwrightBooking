import { Page } from "@playwright/test";

export class BasePage {
    readonly page:Page;

    constructor (page:Page) {
        this.page = page;
    }

    async goToApp() {
        await this.page.goto('/', {waitUntil: 'domcontentloaded'});
    }

    
}