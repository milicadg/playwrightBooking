import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RoomPage extends BasePage {
    
    readonly roomIdHeader: Locator;
    readonly editButton: Locator;
    readonly roomType: Locator;

    constructor(page: Page, roomId:number, roomName: string) {
        super(page);
        this.roomIdHeader = page.locator('//h2[(text() = "Room: ") and (text()="' + roomName + '")]');
        this.editButton = page.getByText('Edit');
        this.roomType = page.locator('//p[text()="Type: "]/span');
        
    }

    async goToRoom(roomId: number) {
        await this.page.goto('/#/admin/room/' + roomId, {waitUntil: 'domcontentloaded'});
    }

    async editRoom () {
        await this.editButton.click();
    }

    

}