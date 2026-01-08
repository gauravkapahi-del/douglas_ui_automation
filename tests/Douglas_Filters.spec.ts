import test, { expect } from "../common/baseTest";


test.describe("User verify different page filter in douglas website", () => {
  test("Perfume page filter verification", async ({ page,homePage,perfumePage}, testinfo) => {
    await test.step("Navigate to Douglas page", async () => {
      await homePage.navigateToHomePage();
      await homePage.acceptAllCookies();
    });

    await test.step("Navigate to Perfume page", async () => {
      await homePage.navigateToPerfume();
    });

    await test.step("Apply filter and verify filter results", async () => {
      await perfumePage.openFilterOptions();

      await perfumePage.applyMarkeFilter("adidas");
    });
  });

  test("Nue page filter verification", async ({
    page,
    homePage,
    nuePage,
  }, testinfo) => {
    await test.step("Navigate to Douglas page", async () => {
      await homePage.navigateToHomePage();
      await homePage.acceptAllCookies();
    });

    await test.step("Navigate to Nue page", async () => {
      await homePage.navigateToNuePage();
    });

    await test.step("Apply filter and verify filter results", async () => {
      await nuePage.openFilterOptions();

      await nuePage.applyMarkeFilter("Anny");
    });
  });

  test("Sale page filter verification", async ({
    page,
    homePage,
    salePage,
  }, testinfo) => {
    await test.step("Navigate to Douglas page", async () => {
      await homePage.navigateToHomePage();
      await homePage.acceptAllCookies();
    });

    await test.step("Navigate to Sale page", async () => {
      await homePage.navigateToSalePage();
    });

    await test.step("Apply filter and verify filter results", async () => {
      await salePage.openFilterOptions();

      await salePage.applyMarkeFilter("7days");
    });
  });
});
