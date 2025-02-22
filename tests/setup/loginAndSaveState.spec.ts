import { test, expect } from "@playwright/test";
import HomePage from "../../POM/pages/HomePage";
import SignInForm from "../../POM/forms/SignInForm";

test.describe("My garage", () => {
  let homePage: HomePage;
  let signInForm: SignInForm;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signInForm = new SignInForm(page);

    await homePage.open();

  });

    test("Log in", async ({ page }) => {
      await homePage.clickSignInButton();
      await signInForm.login("test1739061026459@test.io", "Very1strong");
      await page.waitForTimeout(500);
      await page.context().storageState({ path: "userOneState.json" });
    });
  });
