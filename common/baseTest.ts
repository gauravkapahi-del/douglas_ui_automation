import { Page, test as baseTest } from "@playwright/test";
import { CommonScenario } from "../common/CommonScenario";
import { CommonPage } from "../common/CommonPage";
import { HomePage } from "../pages/HomePage";
import { PerfumePage } from "../pages/PerfumePage";
import { NuePage } from "../pages/NuePage";
import { salePage } from "../pages/SalePage";

// declaring the objects type for autocompletion
interface PageObjects {
  homePage: HomePage;
  commonScenarioPage: CommonScenario;
  perfumePage: PerfumePage;
  nuePage: NuePage;
  salePage: salePage;
}
// intializing all the page objects you have in your app
// and import them as fixture in spec file
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
    await use(new salePage(page, commonScenarioPage));
  },
});

// test.afterEach(async ({ page }) => {
//   await page.close();
// });

// export default and name export so spec files can use it
export default test;
export const expect = test.expect;
