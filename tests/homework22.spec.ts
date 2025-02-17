import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Happy path", () => {
  test("Register new user", async ({ page }) => {
    await page.getByText("Sign Up").click();
    await page.locator('//*[@id="signupName"]').fill("John");
    await page.locator('//*[@id="signupLastName"]').fill("Doe");
    await page.getByLabel("Email").fill(`testemail+${Date.now()}@google.com`);
    await page.locator('//*[@id="signupPassword"]').fill("Strongpass1");
    await page.getByLabel("Re-enter password").fill("Strongpass1");
    await page.getByText('Register').click();
  });
});

test.describe("Name field tests", () => {
  test("Name is empty", async ({ page }) => {
    await page.getByText("Sign Up").click();
    await page.locator('//*[@id="signupName"]').focus();
    await page.locator('//*[@id="signupName"]').blur();
    await expect(page.getByText("Name required")).toBeVisible();
    await expect(page.locator('//*[@id="signupName"]')).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await page.getByText("Register").isDisabled;
  });

  test("Name is short", async ({ page }) => {
    await page.getByText("Sign Up").click();
    await page.locator('//*[@id="signupName"]').fill("J");
    await page.locator('//*[@id="signupName"]').blur();
    await expect(
      page.getByText("Name has to be from 2 to 20 characters long")
    ).toBeVisible();
    await expect(page.locator('//*[@id="signupName"]')).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await page.getByText("Register").isDisabled;
  });

  test("Name is long", async ({ page }) => {
    await page.getByText("Sign Up").click();
    await page.locator('//*[@id="signupName"]').fill("Joooooooooooooooooohn");
    await page.locator('//*[@id="signupName"]').blur();
    await expect(
      page.getByText("Name has to be from 2 to 20 characters long")
    ).toBeVisible();
    await expect(page.locator('//*[@id="signupName"]')).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await page.getByText("Register").isDisabled;
  });

  test("Name is imcorrect", async ({ page }) => {
    await page.getByText("Sign Up").click();
    await page.locator('//*[@id="signupName"]').fill("@");
    await page.locator('//*[@id="signupName"]').blur();
    await expect(
      page.getByText("Name has to be from 2 to 20 characters long")
    ).toBeVisible();
    await expect(page.locator('//*[@id="signupName"]')).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await page.getByText("Register").isDisabled;
  });
});

test.describe("Last name field tests", () => {
  test("Last name is empty", async ({ page }) => {
    await page.getByText("Sign Up").click();
    await page.locator('//*[@id="signupLastName"]').focus();
    await page.locator('//*[@id="signupLastName"]').blur();
    await expect(page.getByText("Last name required")).toBeVisible();
    await expect(page.locator('//*[@id="signupLastName"]')).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await page.getByText("Register").isDisabled;
  });

  test("Last name is short", async ({ page }) => {
    await page.getByText("Sign Up").click();
    await page.locator('//*[@id="signupLastName"]').fill("C");
    await page.locator('//*[@id="signupLastName"]').blur();
    await expect(
      page.getByText("Last name has to be from 2 to 20 characters long")
    ).toBeVisible();
    await expect(page.locator('//*[@id="signupLastName"]')).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await page.getByText("Register").isDisabled;
  });

  test("Last name is long", async ({ page }) => {
    await page.getByText("Sign Up").click();
    await page
      .locator('//*[@id="signupLastName"]')
      .fill("Ceeeeeeeeeeeeeeeeeeena");
    await page.locator('//*[@id="signupLastName"]').blur();
    await expect(
      page.getByText("Last name has to be from 2 to 20 characters long")
    ).toBeVisible();
    await expect(page.locator('//*[@id="signupLastName"]')).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await page.getByText("Register").isDisabled;
  });

  test("Last name is imcorrect", async ({ page }) => {
    await page.getByText("Sign Up").click();
    await page.locator('//*[@id="signupLastName"]').fill("@");
    await page.locator('//*[@id="signupLastName"]').blur();
    await expect(
      page.getByText("Last name has to be from 2 to 20 characters long")
    ).toBeVisible();
    await expect(page.locator('//*[@id="signupLastName"]')).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await page.getByText("Register").isDisabled;
  });
});

test.describe("Email field tests", () => {
  test("Email is empty", async ({ page }) => {
    await page.getByText("Sign Up").click();
    await page.getByLabel("Email").focus();
    await page.getByLabel("Email").blur();
    await expect(page.getByText("Email required")).toBeVisible();
    await expect(page.getByLabel("Email")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await page.getByText("Register").isDisabled;
  });

  test("Email is incorrect", async ({ page }) => {
    await page.getByText("Sign Up").click();
    await page.getByLabel("Email").focus();
    await page.getByLabel("Email").fill("@_@");
    await page.getByLabel("Email").blur();
    await expect(page.getByText("Email is incorrect")).toBeVisible();
    await expect(page.getByLabel("Email")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await page.getByText("Register").isDisabled;
  });
});

test.describe("Password field tests", () => {
  test("Password is empty", async ({ page }) => {
    await page.getByText("Sign Up").click();
    await page.locator('//*[@id="signupPassword"]').focus();
    await page.locator('//*[@id="signupPassword"]').blur();
    await expect(page.getByText("Password required")).toBeVisible();
    await expect(page.locator('//*[@id="signupPassword"]')).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await page.getByText("Register").isDisabled;
  });

  test("Password is weak", async ({ page }) => {
    await page.getByText("Sign Up").click();
    await page.locator('//*[@id="signupPassword"]').focus();
    await page.locator('//*[@id="signupPassword"]').fill("weakpassword");
    await page.locator('//*[@id="signupPassword"]').blur();
    await expect(
      page.getByText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      )
    ).toBeVisible();
    await expect(page.locator('//*[@id="signupPassword"]')).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await page.getByText("Register").isDisabled;
  });

  test("Password is short", async ({ page }) => {
    await page.getByText("Sign Up").click();
    await page.locator('//*[@id="signupPassword"]').focus();
    await page.locator('//*[@id="signupPassword"]').fill("Q1qwe");
    await page.locator('//*[@id="signupPassword"]').blur();
    await expect(
      page.getByText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      )
    ).toBeVisible();
    await expect(page.locator('//*[@id="signupPassword"]')).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await page.getByText("Register").isDisabled;
  });

  test("Password is long", async ({ page }) => {
    await page.getByText("Sign Up").click();
    await page.locator('//*[@id="signupPassword"]').focus();
    await page
      .locator('//*[@id="signupPassword"]')
      .fill("ToMuch111strongPassword");
    await page.locator('//*[@id="signupPassword"]').blur();
    await expect(
      page.getByText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      )
    ).toBeVisible();
    await expect(page.locator('//*[@id="signupPassword"]')).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await page.getByText("Register").isDisabled;
  });
});

test.describe("Re-password field tests", () => {
  test("Re-password is empty", async ({ page }) => {
    await page.getByText("Sign Up").click();
    await page.getByLabel("Re-enter password").focus();
    await page.getByLabel("Re-enter password").blur();
    await expect(page.getByText("Re-enter password required")).toBeVisible();
    await expect(page.getByLabel("Re-enter password")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await page.getByText("Register").isDisabled;
  });

  test("Re-password is doesn't match", async ({ page }) => {
    await page.getByText("Sign Up").click();
    await page.locator('//*[@id="signupPassword"]').fill("Password1");
    await page.getByLabel("Re-enter password").fill("Password2");
    await page.getByLabel("Re-enter password").blur();
    await expect(page.getByText("Passwords do not match")).toBeVisible();
    await expect(page.getByLabel("Re-enter password")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await page.getByText("Register").isDisabled;
  });
});
