import { test, expect } from "@playwright/test";
test.describe("Mocking", () => {
  test("Fake user test", async ({ page }) => {
    const fakeResponseBody = {
        "status": "ok",
        "data": {
            "userId": 181730,
            "photoFilename": "default-user.png",
            "name": "Fake",
            "lastName": "User"
        }
    };
    await page.route("**/api/users/profile", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(fakeResponseBody),
        });
      });
    await page.goto("/");
    await page.getByRole("button", { name: "Sign In" }).click();
    await page
      .locator('//*[@id="signinEmail"]')
      .fill("test1739061026459@test.io");
    await page.locator('//*[@id="signinPassword"]').fill("Very1strong");
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByRole("link", { name: " Profile" }).click();
    await expect(page).toHaveURL("https://qauto.forstudy.space/panel/profile");
    await expect(page).toHaveTitle("Hillel Qauto");
    await expect(page.getByText("Fake User")).toBeVisible();
  });
});
