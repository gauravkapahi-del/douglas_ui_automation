import { expect, Page } from "@playwright/test";
import { CommonScenario } from "./CommonScenario";
import { getPageLogger } from "../utility/logger";

export class CommonPage {
  protected logger = getPageLogger("CommonPage");

  constructor(public page: Page, readonly scenario: CommonScenario) {
    this.logger.info("CommonPage initialized");
  }

  public getValue(key: string) {
    return this.scenario.getValue(key);
  }

  public setValue(key: string, value: string) {
    this.scenario.setValue(key, value);
  }

  async takeScreenshot(name: string) {
    await this.scenario.takeScreenshot(name);
  }

  async navigateTo(url: string): Promise<void> {
    this.logger.info("Navigating to URL", { url });
    try {
      await this.page.goto(url);
      this.logger.info("Successfully navigated to URL", { url });
    } catch (error) {
      this.logger.error("Failed to navigate to URL", error, { url });
      throw error;
    }
  }

  async naviagteBack(): Promise<void> {
    this.logger.info("Navigating back");
    try {
      await this.page.goBack();
      this.logger.info("Successfully navigated back");
    } catch (error) {
      this.logger.error("Failed to navigate back", error);
      throw error;
    }
  }

  async waitForElementVisible(
    locator: string,
    timeout: number = 10000
  ): Promise<void> {
    this.logger.debug("Waiting for element to be visible", {
      locator,
      timeout,
    });
    try {
      await this.page.locator(locator).waitFor({ state: "visible", timeout });
      this.logger.debug("Element is now visible", { locator });
    } catch (error) {
      this.logger.error("Element not visible within timeout", error, {
        locator,
        timeout,
      });
      throw error;
    }
  }

  async waitForElementClickable(
    locator: string,
    timeout: number = 10000
  ): Promise<void> {
    await this.page.locator(locator).waitFor({ state: "visible", timeout });
    await expect(this.page.locator(locator)).toBeEnabled();
  }

  async clickElement(locator: string): Promise<void> {
    this.logger.debug("Attempting to click element", { locator });
    try {
      const elem = await this.page.locator(locator);
      elem.scrollIntoViewIfNeeded();
      await this.page.click(locator, { timeout: 9000 });
      this.logger.debug("Successfully clicked element", { locator });
    } catch (error) {
      this.logger.error("Failed to click element", error, { locator });
      throw error;
    }
  }

  async waitForDocumentReady(): Promise<void> {
    this.logger.debug("Waiting for document to be ready");
    try {
      await this.page.waitForLoadState("domcontentloaded");
      this.logger.debug("Document is ready");
    } catch (error) {
      this.logger.error("Document did not become ready", error);
      throw error;
    }
  }

  async mouseOver(locator: string): Promise<void> {
    this.logger.debug("Moving mouse over element", { locator });
    try {
      const obj = this.page.locator(locator);
      await obj.hover();
      this.logger.debug("Successfully moved mouse over element", { locator });
    } catch (error) {
      this.logger.error("Failed to move mouse over element", error, {
        locator,
      });
      throw error;
    }
  }

  async waitForElementInvisible(
    locator: string,
    waitFor: number = 5
  ): Promise<void> {
    this.logger.debug("Waiting for element to be invisible", {
      locator,
      waitFor,
    });
    try {
      await expect(this.page.locator(locator)).not.toBeVisible();
      this.logger.debug("Element is now invisible", { locator });
    } catch (error) {
      this.logger.error("Element did not become invisible", error, {
        locator,
        waitFor,
      });
      throw error;
    }
  }

  async fillInput(locator: string, text: string): Promise<void> {
    this.logger.debug("Filling input field", {
      locator,
      textLength: text.length,
    });
    try {
      await this.waitForElementVisible(locator);
      await this.page.locator(locator).clear();
      await this.page.locator(locator).fill(text);
      this.logger.debug("Successfully filled input field", { locator });
    } catch (error) {
      this.logger.error("Failed to fill input field", error, { locator });
      throw error;
    }
  }

  async fillInputByTyping(locator: string, text: string): Promise<void> {
    await this.waitForElementVisible(locator);
    await this.page.locator(locator).clear();
    await this.page.keyboard.type(text);
  }

  async getElementText(locator: string): Promise<string> {
    await this.waitForElementVisible(locator);
    return (await this.page.locator(locator).textContent()) || "";
  }

  async verifyElementVisible(locator: string): Promise<void> {
    this.logger.debug("Verifying element visibility", { locator });
    try {
      await expect(this.page.locator(locator)).toBeVisible();
      this.logger.debug("Element is visible", { locator });
    } catch (error) {
      this.logger.error("Element is not visible", error, { locator });
      throw error;
    }
  }

  async scrollToElement(locator: string): Promise<void> {
    this.logger.debug("Scrolling to element", { locator });
    try {
      await this.page.locator(locator).scrollIntoViewIfNeeded();
      this.logger.debug("Successfully scrolled to element", { locator });
    } catch (error) {
      this.logger.error("Failed to scroll to element", error, { locator });
      throw error;
    }
  }

  async verifyElementText(
    locator: string,
    expectedText: string
  ): Promise<void> {
    this.logger.debug("Verifying element text", { locator, expectedText });
    try {
      await expect(this.page.locator(locator)).toHaveText(expectedText);
      this.logger.debug("Element text verified successfully", { locator });
    } catch (error) {
      this.logger.error("Element text verification failed", error, {
        locator,
        expectedText,
      });
      throw error;
    }
  }

  async verifyElementTextStrict(
    locator: string,
    expectedText: string
  ): Promise<void> {
    this.logger.debug("Verifying element text (strict)", {
      locator,
      expectedText,
    });
    try {
      expect(await this.page.locator(locator).innerText()).toBe(expectedText);
      this.logger.debug("Element text verified successfully (strict)", {
        locator,
      });
    } catch (error) {
      this.logger.error("Element text verification failed (strict)", error, {
        locator,
        expectedText,
      });
      throw error;
    }
  }

  async verifyCurrentUrl(expectedUrl: string | RegExp): Promise<void> {
    this.logger.debug("Verifying current URL", {
      expectedUrl: expectedUrl.toString(),
    });
    try {
      await expect(this.page).toHaveURL(expectedUrl);
      this.logger.debug("Current URL verified successfully");
    } catch (error) {
      this.logger.error("URL verification failed", error, {
        expectedUrl: expectedUrl.toString(),
      });
      throw error;
    }
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
  }

  async getInnerText(locator: string): Promise<string> {
    await this.waitForElementVisible(locator);
    return await this.page.locator(locator).innerText();
  }

  async getAllTexts(input: string): Promise<Array<string>> {
    const locator = this.page.locator(input);
    return await locator.allInnerTexts();
  }

  async waitForElement(locator: string): Promise<void> {
    await this.page
      .locator(locator)
      .waitFor({ state: "visible", timeout: 10000 });
  }

  async sleep(seconds: number) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }

  async getTodayDate(): Promise<string> {
    const today = new Date();
    return today.toDateString();
  }

  async waitForLoaderToDisappear(timeout: number = 10000): Promise<void> {
    this.logger.debug("Waiting for loader to disappear", { timeout });
    try {
      await this.page
        .locator('//div[@class="loader-image"]')
        .waitFor({ state: "hidden", timeout });
      this.logger.debug("Loader disappeared successfully");
    } catch (error) {
      this.logger.warn(`Loader did not disappear within ${timeout} ms`);
    }
    await this.sleep(2);
  }
}
