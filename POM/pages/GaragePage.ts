import {Locator, Page } from "@playwright/test"

export default class GaragePage{
    readonly page: Page;
    //readonly signInButton: Locator;
    readonly addCarButton: Locator;
    constructor(page: Page){
        this.page = page;
       // this.signInButton = page.getByText('Sign In');
       this.addCarButton = page.getByText('Add car');
    }

    async clickAddCarButton() {
        await this.addCarButton.click();
    }
    
    async clickConfirmAddCarButton() {
        //await this.signInButton.click();
    }
}




