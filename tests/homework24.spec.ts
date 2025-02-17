import { test, expect } from "@playwright/test";
import HomePage from "../POM/pages/HomePage";
import SignUpForm from "../POM/forms/SignUpForm";

test.describe("My tests", () => {
  let homePage: HomePage;
  let signUpForm: SignUpForm;
  test.beforeEach(async ({ page }) => {
    signUpForm = new SignUpForm(page);
    homePage = new HomePage(page);
    await homePage.open();
  });

  test.describe("Happy path", () => {
    test("Register new user", async () => {
      await signUpForm.clickSignUpButton();
      await signUpForm.nameField.fill("John");
      await signUpForm.lastNameField.fill("Doe");
      await signUpForm.emailField.fill(`testemail+${Date.now()}@google.com`);
      await signUpForm.passwordField.fill("Strongpass1");
      await signUpForm.rePasswordField.fill("Strongpass1");
      await signUpForm.registerButton.click();
    });
  });
  test.describe("Name field tests", () => {
    test("Name is empty", async () => {
      console.log(process.env.USER_NAME);
      console.log(process.env.PASSWORD);
      await signUpForm.clickSignUpButton();
      await signUpForm.nameField.focus();
      await signUpForm.nameField.blur();
      await signUpForm.checkError("Name required");
      await signUpForm.checkErrorColorName();
      await signUpForm.regBtnIsDisabled();
    });

    test("Name is short", async ({ page }) => {
      await signUpForm.clickSignUpButton();
      await signUpForm.nameField.fill("J");
      await signUpForm.nameField.blur();
      await signUpForm.checkError(
        "Name has to be from 2 to 20 characters long"
      );
      await signUpForm.checkErrorColorName();
      await signUpForm.regBtnIsDisabled();
    });

    test("Name is long", async () => {
      await signUpForm.clickSignUpButton();
      await signUpForm.nameField.fill("Joooooooooooooooooohn");
      await signUpForm.nameField.blur();
      await signUpForm.checkError(
        "Name has to be from 2 to 20 characters long"
      );
      await signUpForm.checkErrorColorName();
      await signUpForm.regBtnIsDisabled();
    });

    test("Name is incorrect", async () => {
      await signUpForm.clickSignUpButton();
      await signUpForm.nameField.fill("@");
      await signUpForm.nameField.blur();
      await signUpForm.checkError(
        "Name has to be from 2 to 20 characters long"
      );
      await signUpForm.checkErrorColorName();
      await signUpForm.regBtnIsDisabled();
    });
  });
  test.describe("Last name field tests", () => {
    test("Last name is empty", async () => {
      await signUpForm.clickSignUpButton();
      await signUpForm.lastNameField.focus();
      await signUpForm.lastNameField.blur();
      await signUpForm.checkError("Last name required");
      await signUpForm.checkErrorColorLastName();
      await signUpForm.regBtnIsDisabled();
    });

    test("Last name is short", async () => {
      await signUpForm.clickSignUpButton();
      await signUpForm.lastNameField.fill("C");
      await signUpForm.lastNameField.blur();
      await signUpForm.checkError(
        "Last name has to be from 2 to 20 characters long"
      );
      await signUpForm.checkErrorColorLastName();
      await signUpForm.regBtnIsDisabled();
    });

    test("Last name is long", async ({ page }) => {
      await signUpForm.clickSignUpButton();
      await signUpForm.lastNameField.fill("Ceeeeeeeeeeeeeeeeeeena");
      await signUpForm.lastNameField.blur();
      await signUpForm.checkError(
        "Last name has to be from 2 to 20 characters long"
      );
      await signUpForm.checkErrorColorLastName();
      await signUpForm.regBtnIsDisabled();
    });

    test("Last name is incorrect", async () => {
      await signUpForm.clickSignUpButton();
      await signUpForm.lastNameField.fill("@");
      await signUpForm.lastNameField.blur();
      await signUpForm.checkError(
        "Last name has to be from 2 to 20 characters long"
      );
      await signUpForm.checkErrorColorLastName();
      await signUpForm.regBtnIsDisabled();
    });
  });
  test.describe("Email field tests", () => {
    test("Email is empty", async () => {
      await signUpForm.clickSignUpButton();
      await signUpForm.emailField.focus();
      await signUpForm.emailField.blur();
      await signUpForm.checkError("Email required");
      await signUpForm.checkErrorColorEmail();
      await signUpForm.regBtnIsDisabled();
    });

    test("Email is incorrect", async () => {
      await signUpForm.clickSignUpButton();
      await signUpForm.emailField.focus();
      await signUpForm.emailField.fill("@_@");
      await signUpForm.emailField.blur();
      await signUpForm.checkError("Email is incorrect");
      await signUpForm.checkErrorColorEmail();
      await signUpForm.regBtnIsDisabled();
    });
  });
  test.describe("Password field tests", () => {
    test("Password is empty", async ({ page }) => {
      await signUpForm.clickSignUpButton();
      await signUpForm.passwordField.focus();
      await signUpForm.passwordField.blur();
      await signUpForm.checkError("Password required");
      await signUpForm.checkErrorColorPassword();
      await signUpForm.regBtnIsDisabled();
    });

    test("Password is weak", async () => {
      await signUpForm.clickSignUpButton();
      await signUpForm.passwordField.focus();
      await signUpForm.passwordField.fill("weakpassword");
      await signUpForm.passwordField.blur();
      await signUpForm.checkError(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
      await signUpForm.checkErrorColorPassword();
      await signUpForm.regBtnIsDisabled();
    });

    test("Password is short", async () => {
      await signUpForm.clickSignUpButton();
      await signUpForm.passwordField.focus();
      await signUpForm.passwordField.fill("Q1qwe");
      await signUpForm.passwordField.blur();
      await signUpForm.checkError(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
      await signUpForm.checkErrorColorPassword();
      await signUpForm.regBtnIsDisabled();
    });

    test("Password is long", async () => {
      await signUpForm.clickSignUpButton();
      await signUpForm.passwordField.focus();
      await signUpForm.passwordField.fill("ToMuch111strongPassword");
      await signUpForm.passwordField.blur();
      await signUpForm.checkError(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
      await signUpForm.checkErrorColorPassword();
      await signUpForm.regBtnIsDisabled();
    });
  });
  test.describe("Re-password field tests", () => {
    test("Re-password is empty", async () => {
      await signUpForm.clickSignUpButton();
      await signUpForm.rePasswordField.focus();
      await signUpForm.rePasswordField.blur();
      await signUpForm.checkError("Re-enter password required");
      await signUpForm.checkErrorColorRePassword();
      await signUpForm.regBtnIsDisabled();
    });

    test("Re-password is doesn't match", async () => {
      await signUpForm.clickSignUpButton();
      await signUpForm.passwordField.fill("Password1");
      await signUpForm.rePasswordField.fill("Password2");
      await signUpForm.rePasswordField.blur();
      await signUpForm.checkError("Passwords do not match");
      await signUpForm.checkErrorColorRePassword();
      await signUpForm.regBtnIsDisabled();
    });
  });
});
