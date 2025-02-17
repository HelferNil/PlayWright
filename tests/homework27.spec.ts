import { test, expect } from "@playwright/test";
import HomePage from "../POM/pages/HomePage";
import GaragePage from "../POM/pages/GaragePage";
import SignUpForm from "../POM/forms/SignUpForm";
import SignInForm from "../POM/forms/SignInForm";
test.describe("My tests", () => {
  test.use({ storageState: "userOneState.json" });
  let homePage: HomePage;
  let garagePage: GaragePage;
  let signUpForm: SignUpForm;
  let signInForm: SignInForm;
  test.beforeEach(async ({ page }) => {
    signUpForm = new SignUpForm(page);
    signInForm = new SignInForm(page);
    garagePage = new GaragePage(page);
    homePage = new HomePage(page);
    //await homePage.open();
  });

  test.describe("Happy path", () => {
    test("Add car", async ({ page }) => {
      //await signInForm.login("test1739061026459@test.io", "Very1strong");
      //await signInForm.clickLoginButton;
      //await page.context().storageState({ path: "userOneState.json" });
      await homePage.openGarage();
      await garagePage.clickAddCarButton();
    });
  });
});
