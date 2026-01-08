import { Page } from "@playwright/test";
import { CommonPage } from "../common/CommonPage";
import { CommonScenario } from "../common/CommonScenario";
import { NuePageLocators } from "../locators/NuePageLocators";

export class NuePage extends CommonPage {
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  async openFilterOptions() {
    await this.page.locator(NuePageLocators.filterOptionsButton).click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async applyMarkeFilter(marke: string) {
    await this.clickElement(NuePageLocators.markeOption);
    await this.page.locator(NuePageLocators.markeSearchInput).fill(marke);
    await this.page.locator(`text=${marke}`).click();
    await this.page.locator(NuePageLocators.applyFilterButton).click();
    await this.page.waitForLoadState("domcontentloaded");
  }
}
