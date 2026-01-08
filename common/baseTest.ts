import { test as baseTest } from "@playwright/test";
import { CommonScenario } from "../common/CommonScenario";
import { HomePage } from "../pages/HomePage";
import { PerfumePage } from "../pages/PerfumePage";
import { NuePage } from "../pages/NuePage";
import { SalePage } from "../pages/SalePage";

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

export default test;
export const expect = test.expect;
