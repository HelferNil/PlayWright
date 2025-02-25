import test, { expect, request } from "@playwright/test";

test.describe("Garage tests", () => {
  let carId: string;
  let globalAuthHeader: string;
  let addedCarsIds: any[] = [];
  test.beforeEach(async ({ request }) => {
    const responseAuth = await request.post("/api/auth/signin", {
      data: {
        email: "test1739061026459@test.io",
        password: "Very1strong",
        remember: false,
      },
    });
    globalAuthHeader = responseAuth.headers()["set-cookie"].split(";")[0];
    expect(globalAuthHeader).toBeDefined();
  });

  test("Add new car", async ({ request }) => {
    const responseAddCar = await request.post("/api/cars", {
      data: {
        carBrandId: 1,
        carModelId: 2,
        mileage: 666,
      },
      headers: {
        Cookie: globalAuthHeader,
      },
    });
    const responseAddCarJson = await responseAddCar.json();
    addedCarsIds.push(responseAddCarJson.data.id);
    console.log(addedCarsIds);

    const responseAddedCar = await request.get(`/api/cars/${addedCarsIds[0]}`, {
      headers: {
        Cookie: globalAuthHeader,
      },
    });
    const responseGetCarsJson = await responseAddedCar.json();
    await expect(responseGetCarsJson.data.brand).toBe("Audi");
    await expect(responseGetCarsJson.data.model).toBe("R8");
    await expect(responseGetCarsJson.data.mileage).toBe(666);
    carId = await responseGetCarsJson.data.id;
    //console.log(responseGetCarsJson.data);
  });

  test("Edit existing car", async ({ request }) => {
    const responseAddedCar = await request.get(`/api/cars/${addedCarsIds[0]}`, {
      headers: {
        Cookie: globalAuthHeader,
      },
    });
    const responseChangeCar = await request.put(`/api/cars/${carId}`, {
      data: {
        carBrandId: 3,
        carModelId: 4,
        mileage: 667,
      },
      headers: {
        Cookie: globalAuthHeader,
      },
    });
    const responseGetCarsJson = await responseChangeCar.json();
    //console.log(await responseGetCarsJson);
    await expect(responseGetCarsJson.data.mileage).toBe(667);
  });

  //===================Трохи негативу=======================
  test("Edit unexisting car", async ({ request }) => {
    const responseChangeCar = await request.put(`/api/cars/99999999999`, {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 1000000,
      },
      headers: {
        Cookie: globalAuthHeader,
      },
    });
    const responseEditCarsJson = await responseChangeCar.json();
    await expect(responseEditCarsJson.message).toBe("Car not found");
    await expect(responseEditCarsJson.status).toBe("error");
    console.log(await responseEditCarsJson);
  });

  test("Edit with lower mileage car", async ({ request }) => {
    const responseChangeCar = await request.put(`/api/cars/${carId}`, {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 1,
      },
      headers: {
        Cookie: globalAuthHeader,
      },
    });
    const responseEditCarsJson = await responseChangeCar.json();
    await expect(responseEditCarsJson.message).toBe(
      "New mileage is less then previous entry"
    );
    await expect(responseEditCarsJson.status).toBe("error");
    console.log(await responseEditCarsJson);
  });
  //===========================================================

  test("Get existing cars", async ({ request }) => {
    const responseChangeCar = await request.get(`/api/cars/`, {
      headers: {
        Cookie: globalAuthHeader,
      },
    });
    const responseGetCarsJson = await responseChangeCar.json();
    //console.log(responseGetCarsJson.data);
  });

  //====================Чистка гаражу==============================
  test.afterAll("Delete existing cars", async ({ request }) => {
    const responseGetCars = await request.get(`/api/cars/`, {
      headers: {
        Cookie: globalAuthHeader,
      },
    });
    const carsData = await responseGetCars.json();
    //console.log(carsData.data);
    for (const car of carsData.data) {
      const carId = car.id;
      const responseDeleteCar = await request.delete(`/api/cars/${carId}`, {
        headers: {
          Cookie: globalAuthHeader,
        },
      });
    }
    //   console.log(await request.get(`/api/cars/`,{
    //     headers: {
    //       Cookie: globalAuthHeader,
    //     }
    // }));
  });
});
