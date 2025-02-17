import {expect, Locator, Page } from "@playwright/test"

export default class SignUpForm{
    readonly page: Page;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.emailField = page.locator('//*[@id="signinEmail"]');
        this.passwordField = page.locator('//*[@id="signinPassword"]');
        this.loginButton = page.getByText('Login');
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async login(email: string, password: string) {
       await this.emailField.fill(email);
       await this.passwordField.fill(password);
       await this.clickLoginButton();
    }

}
