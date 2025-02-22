import { test, expect } from "@playwright/test";
test.describe("Request", () => {
  test.describe("Public requests", () => {
    test("Get all brands [/api/cars/brands]", async ({ request }) => {
      const response = await request.get("/api/cars/brands");
      const responseJson = await response.json();
      const responseData = responseJson.data;

      expect(responseData.length).toBe(5);
      expect(responseData[0].title).toBe("Audi");
      expect(responseData[2].title).toBe("Ford");
    });

    test("Sign in [/api/auth/signin]", async ({ request }) => {
      const responseAuth = await request.post("/api/auth/signin", {
        data: {
          email: "test1739061026459@test.io",
          password: "Very1strong",
          remember: false,
        },
      });

      const responseAuthJson = await responseAuth.json();
      console.log(await request.storageState());
      console.log(responseAuthJson);

      const responseCars = await request.get("/api/cars");
      console.log(await responseCars.json());
    });
  });
});
