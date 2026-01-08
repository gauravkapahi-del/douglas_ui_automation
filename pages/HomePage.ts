import { expect, Page } from "@playwright/test";
import { CommonPage } from "../common/CommonPage";
import { CommonScenario } from "../common/CommonScenario";
import { testData } from "../testdata/testData";
import { homePageLocators } from "../locators/HomePageLocators";

export class HomePage extends CommonPage {
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  async navigateToHomePage() {
    await this.navigateTo(testData.qa);
    await this.page.waitForLoadState("domcontentloaded");
  }

  async navigateToPerfume() {
    await this.navigateTo("https://www.douglas.de/de/c/parfum/01");

    // await this.page.locator(homePageLocators.perfumesLink).click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async acceptAllCookies() {
    await this.page.locator(homePageLocators.acceptAllCookiesButton).click();
  }

  async navigateToNuePage() {
    await this.clickElement(homePageLocators.nueLink);
    await this.page.waitForLoadState("domcontentloaded");
  }

  async navigateToSalePage() {
    await this.clickElement(homePageLocators.saleLink);
    await this.page.waitForLoadState("domcontentloaded");
  }
}
