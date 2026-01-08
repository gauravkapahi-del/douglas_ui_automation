import { Page } from "@playwright/test";
import { CommonPage } from "../common/CommonPage";
import { CommonScenario } from "../common/CommonScenario";
import { PerfumePageLocators } from "../locators/PerfumePageLocators";

export class PerfumePage extends CommonPage {
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  async openFilterOptions() {
    await this.page.locator(PerfumePageLocators.filterOptionsButton).click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async applyMarkeFilter(marke: string) {
    await this.clickElement(PerfumePageLocators.markeOption);
    await this.page.locator(PerfumePageLocators.markeSearchInput).fill(marke);
    await this.page.locator(`text=${marke}`).click();
    await this.page.locator(PerfumePageLocators.applyFilterButton).click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifySearchResultContainsMarke(marke: string): Promise<boolean> {
    const brandElements = this.page.locator(PerfumePageLocators.brandName);
    const count = await brandElements.count();

    for (let i = 0; i < count; i++) {
      const brandText = await brandElements.nth(i).innerText();
      if (!brandText.toLowerCase().includes(marke.toLowerCase())) {
        return false;
      }
    }
    return true;
  }
}
