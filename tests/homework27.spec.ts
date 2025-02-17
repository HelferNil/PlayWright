import { test, expect } from "@playwright/test";
import HomePage from "../POM/pages/HomePage";
import GaragePage from "../POM/pages/GaragePage";
import SignUpForm from "../POM/forms/SignUpForm";
import SignInForm from "../POM/forms/SignInForm";
import AddCarForm from "../POM/forms/AddCarForm";
test.describe("My tests", () => {
  test.use({ storageState: "userOneState.json" });
  let homePage: HomePage;
  let garagePage: GaragePage;
  let signUpForm: SignUpForm;
  let addCarForm: AddCarForm;
  let signInForm: SignInForm;
  test.beforeEach(async ({ page }) => {
    signUpForm = new SignUpForm(page);
    signInForm = new SignInForm(page);
    addCarForm = new AddCarForm(page);
    garagePage = new GaragePage(page);
    homePage = new HomePage(page);
    //await homePage.open();
  });

  test.describe("Add new BMW Z3", () => {
    test("Add car", async () => {
      await homePage.openGarage();
      await garagePage.clickAddCarButton();
      await addCarForm.addCar('BMW','Z3','55');
      await expect(garagePage.firstCar).toContainText('BMW Z3');



    });
  });
});
