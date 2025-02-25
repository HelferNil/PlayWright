// import { test, expect } from "@playwright/test";
// test.describe("Mocking", () => {
//   test("Verify message when no cars added", async ({ page }) => {
//     const fakeResponseBody = { status: "ok", data: [] };

//     await page.route("**/api/cars", (route) => ({
//       body: JSON.stringify(fakeResponseBody),
//     }));
//     await page.goto("/");
//     await page.getByRole("button", { name: "Sign In" }).click();
//     await page
//       .locator('//*[@id="signinEmail"]')
//       .fill("test1739061026459@test.io");
//     await page.locator('//*[@id="signinPassword"]').fill("Very1strong");
//     await page.getByRole("button", { name: "Login" }).click();

//     await expect(page).toHaveURL("https://qauto.forstudy.space/panel/garage");
//     await expect(page).toHaveTitle("Hillel Qauto");
//     await page.waitForTimeout(500);
//     await expect(page.getByText("You don’t have any cars in your garage")).toBeVisible();
//   });
// });
