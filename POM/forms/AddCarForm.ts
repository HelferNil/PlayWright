import { expect, Locator, Page } from "@playwright/test";

export default class AddCarForm {
  readonly page: Page;
  readonly brand: Locator;
  readonly model: Locator;
  readonly mileage: Locator;
  readonly confirmAdd: Locator;

  constructor(page: Page) {
    this.page = page;
    this.brand = page.locator("#addCarBrand");
    this.model = page.locator("#addCarModel");
    this.mileage = page.locator("#addCarMileage");
    this.confirmAdd = page.getByRole("button", { name: "Add" });
  }

  async addCar(brand: string, model: string, mileage: string) {
    await this.brand.selectOption(brand);
    await this.model.selectOption(model);
    await this.mileage.fill(mileage);
    await this.confirmAdd.click();
  }
}
