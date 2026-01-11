import { chromium } from "@playwright/test";

async function globalTeardown() {
  console.log("Running global teardown - Closing all browsers...");

  // Close all browser instances
  const browser = await chromium.launch();
  const context = await browser.newContext();
  await context.close();
  await browser.close();

  console.log("All browsers closed successfully");
}

export default globalTeardown;
