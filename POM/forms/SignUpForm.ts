import {expect, Locator, Page } from "@playwright/test"

export default class SignUpForm{
    readonly page: Page;
    readonly nameField: Locator;
    readonly lastNameField: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly rePasswordField: Locator;
    readonly registerButton: Locator;
    readonly signUpButton: Locator;

    constructor(page: Page){
        let errorMsg: string;
        this.page = page;
        this.nameField = page.locator('//*[@id="signupName"]');
        this.lastNameField = page.locator('//*[@id="signupLastName"]');
        this.emailField = page.getByLabel("Email");
        this.passwordField = page.locator('//*[@id="signupPassword"]');
        this.rePasswordField = page.getByLabel("Re-enter password");
        this.registerButton = page.getByText('Register');
        this.signUpButton = page.getByText('Sign Up');

    }

    async clickSignUpButton() {
        await this.signUpButton.click();
    }

    async checkError(errorMsg) {
        await expect(this.page.getByText(errorMsg)).toBeVisible();
    }

    async checkErrorColorName() {
        await expect(this.nameField).toHaveCSS("border-color", "rgb(220, 53, 69)");
    }
    async checkErrorColorLastName() {
        await expect(this.lastNameField).toHaveCSS("border-color", "rgb(220, 53, 69)");
    }
    async checkErrorColorEmail() {
        await expect(this.emailField).toHaveCSS("border-color", "rgb(220, 53, 69)");
    }
    async checkErrorColorPassword() {
        await expect(this.passwordField).toHaveCSS("border-color", "rgb(220, 53, 69)");
    }
    async checkErrorColorRePassword() {
        await expect(this.rePasswordField).toHaveCSS("border-color", "rgb(220, 53, 69)");
    }
    async regBtnIsDisabled() {
        await expect(this.registerButton).toBeDisabled();
    }

}
