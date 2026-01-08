import { Page } from "@playwright/test";
import { CommonPage } from "../common/CommonPage";
import { CommonScenario } from "../common/CommonScenario";
import { douglasFilterTestData } from "../testdata/douglasFilterTestData";
import { homePageLocators } from "../locators/HomePageLocators";
import { env } from "node:process";

export class HomePage extends CommonPage {
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  async navigateToHomePage() {
    await this.navigateTo(douglasFilterTestData.baseUrl);
    await this.waitForDocumentReady()
  }

  async navigateToPerfume() {
    await this.clickElement(homePageLocators.perfumesLink);
    await this.waitForDocumentReady();
  }

  async acceptAllCookies() {
    await this.page.locator(homePageLocators.acceptAllCookiesButton).click();
  }

  async navigateToNuePage() {
    await this.clickElement(homePageLocators.nueLink);
    await this.waitForDocumentReady();
  }

  async navigateToSalePage() {
    await this.clickElement(homePageLocators.saleLink);
    await this.waitForDocumentReady();
  }
}
