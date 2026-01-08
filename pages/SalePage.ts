import { Page } from "@playwright/test";
import { CommonPage } from "../common/CommonPage";
import { CommonScenario } from "../common/CommonScenario";
import { SalePageLocators } from "../locators/SalePageLocators";

export class SalePage extends CommonPage {
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  async openFilterOptions() {
    await this.page.locator(SalePageLocators.filterOptionsButton).click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async applyMarkeFilter(marke: string) {
    await this.clickElement(SalePageLocators.markeOption);
    await this.page.locator(SalePageLocators.markeSearchInput).fill(marke);
    await this.page.locator(`text=${marke}`).click();
    await this.page.locator(SalePageLocators.applyFilterButton).click();
    await this.page.waitForLoadState("domcontentloaded");
  }
}
