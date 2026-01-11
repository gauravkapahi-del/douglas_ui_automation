import { test as baseTest, Browser, firefox, chromium } from "@playwright/test";
import { CommonScenario } from "../common/CommonScenario";
import { HomePage } from "../pages/HomePage";
import { PerfumePage } from "../pages/PerfumePage";
import { NuePage } from "../pages/NuePage";
import { SalePage } from "../pages/SalePage";
import { log } from "console";

interface PageObjects {
  homePage: HomePage;
  commonScenarioPage: CommonScenario;
  perfumePage: PerfumePage;
  nuePage: NuePage;
  salePage: SalePage;
}

const test = baseTest.extend<PageObjects>({
  commonScenarioPage: async ({ page }, use, testinfo) => {
    await use(new CommonScenario(page, testinfo));
  },
  homePage: async ({ page, commonScenarioPage }, use) => {
    await use(new HomePage(page, commonScenarioPage));
  },
  perfumePage: async ({ page, commonScenarioPage }, use) => {
    await use(new PerfumePage(page, commonScenarioPage));
  },
  nuePage: async ({ page, commonScenarioPage }, use) => {
    await use(new NuePage(page, commonScenarioPage));
  },
  salePage: async ({ page, commonScenarioPage }, use) => {
    await use(new SalePage(page, commonScenarioPage));
  },
});

// chromium.use(StealthPlugin());

// test.beforeAll(async () => {
//   const browserName = "";
//   let browser;
//   if (browserName.toLowerCase() === "chrome") {
//     // Initialize browser with chromium
//     browser = await chromium.launch({
//       // headless: false,
//       args: ["--disable-web-security"],
//       slowMo: 2000,
//       channel: "chrome",
//     });
//     log("Selected Chrome");
//   } else if (browserName.toLowerCase() === "firefox") {
//     // Initialize browser with firefox
//     browser = await firefox.launch({
//       // headless: false,
//       args: ["--disable-web-security"],
//       slowMo: 2000,
//     });
//     log("Selected Firefox");
//   } else {
//     browser = await chromium.launch({
//       // headless: false,
//       args: [
//         "--disable-web-security",
//         "--start-maximized",
//         "-disable-extensions",
//         "--disable-quic",
//       ],
//       slowMo: 2000,
//       channel: "chrome",
//     });
//     log("Invalid selection. Starting with Chrome.");
//   }

//   // Create a new context and page
//   const context = await browser.newContext({ viewport: null });

//   const page = context.pages().at(0);
//   await context.clearCookies();

//   console.log("Browser initialized successfully");
// });

// Close page and browser after each test
test.afterEach(async ({ page, browser }) => {
  try {
    // Close the current page
    if (page && !page.isClosed()) {
      await page.close();
      console.log("Page closed successfully");
    }

    // Close the browser context
    const context = page?.context();
    if (context && !context.browser()?.isConnected()) {
      await context.close();
      console.log("Browser context closed successfully");
    }
  } catch (error) {
    console.error("Error closing browser resources:", error);
  }
});

export default test;
export const expect = test.expect;
