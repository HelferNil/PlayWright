import {Locator, Page } from "@playwright/test"

export default class HomePage{
    readonly page: Page;
    readonly signInButton: Locator;
    readonly signUpButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.signInButton = page.getByText('Sign In');
        this.signUpButton = page.getByText('Sign Up');
    }


    async open() {
        await this.page.goto('/');
    }
    async openGarage() {
        await this.page.goto('/panel/garage');
    }
    async clickSignInButton() {
        await this.signInButton.click();
    }
    async clickSignUpButton() {
        await this.signUpButton.click();
    }
}




