import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class BookingManagementPage extends BasePage {
    
    readonly managementHeader: Locator;
    readonly roomName: Locator;
    readonly roomType: Locator;
    readonly roomAccessible: Locator;
    readonly roomPrice: Locator;
    readonly wifi: Locator;
    readonly tv: Locator;
    readonly radio: Locator;
    readonly refreshments: Locator;
    readonly safe: Locator;
    readonly views: Locator;
    readonly createButton: Locator;
    readonly createdRoomName: Locator;
    readonly createdRoomType: Locator;
    readonly createdRoomPrice: Locator;
    readonly createdRoomAccessible: Locator;
    readonly createdRoomWifi: Locator;
    readonly createdRoomTv: Locator;
    readonly createdRoomRadio: Locator;
    readonly createdRoomRefreshments: Locator;
    readonly createdRoomSafe: Locator;
    readonly createdRoomView: Locator;
    readonly createdRoomDetails: Locator;


    constructor(page: Page, roomNameNumber:string) {
        super(page);
        const roomTypeL = '//p[@id="roomName'+roomNameNumber+'"]//../..//div[2]/p';
        const roomAccessibleL = '//p[@id="roomName'+roomNameNumber+'"]//../..//div[3]/p';
        const roomPriceL = '//p[@id="roomName'+roomNameNumber+'"]//../..//div[4]/p';
        const details = '//p[@id="roomName'+roomNameNumber+'"]//../..//div[5]/p';

        this.managementHeader = page.locator('#frontPageLink');    
        this.roomName = page.getByTestId('roomName');  
        this.roomType = page.locator('#type');
        this.roomAccessible = page.locator('#accessible');
        this.roomPrice = page.locator('#roomPrice');
        this.wifi = page.locator('#wifiCheckbox');
        this.tv = page.locator('#tvCheckbox');
        this.refreshments = page.locator('#refreshCheckbox');
        this.radio = page.locator('#radioCheckbox');
        this.safe = page.locator('#safeCheckbox');
        this.views = page.locator('#viewsCheckbox');
        this.createButton = page.locator('#createRoom');

        //created room locators
        this.createdRoomName = page.locator('#roomName'+ roomNameNumber);
        this.createdRoomType = page.locator(roomTypeL);
        this.createdRoomAccessible = page.locator(roomAccessibleL);
        this.createdRoomPrice = page.locator(roomPriceL);
        this.createdRoomDetails = page.locator(details); 
    }

    async setFeatures(args:[boolean, boolean, boolean, boolean, boolean, boolean]){
        await this.setWify(args[0]);
        await this.setTv(args[1]);
        await this.setRadio(args[2]);
        await this.setRefreshments(args[3]);
        await this.setSafe(args[4]);
        await this.setView(args[5]);
    }

    async setWify (hasWify:boolean) {
        if (hasWify) {
            await this.wifi.check();
        }
    }

    async setTv (hasTv:boolean) {
        if (hasTv) {
            await this.tv.check();
        }
    }

    async setRadio (hasRadio:boolean) {
        if (hasRadio) {
            await this.radio.check();
        }
    }

    async setRefreshments (hasRefresh:boolean) {
        if (hasRefresh) {
            await this.refreshments.check();
        }
    }

    async setSafe (hasSafe:boolean) {
        if (hasSafe) {
            await this.safe.check();
        }
    }

    async setView (hasView:boolean) {
        if (hasView) {
            await this.views.check();
        }
    }

    async setRoomType (roomTypeOption:string) {
        await this.roomType.selectOption(roomTypeOption);
    }

    async setAccessible(roomAccessibleOption:boolean) {
        if (roomAccessibleOption) {
            await this.roomAccessible.selectOption('true');
        }
        else {
            await this.roomAccessible.selectOption('false');
        }
    }

    async createRoom (roomName:string, roomType:string, isAccessible:boolean, price:string, hasFeatures:[boolean, boolean, boolean, boolean, boolean, boolean]) {
        await this.roomName.fill(roomName);
        await this.setRoomType(roomType);
        await this.setAccessible(isAccessible);
        await this.roomPrice.fill(price);
        await this.setFeatures(hasFeatures);
        await this.createButton.click();

    }

}