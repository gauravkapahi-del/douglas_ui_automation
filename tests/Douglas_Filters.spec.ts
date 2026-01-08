import test from "../common/baseTest";
import { douglasFilterTestData } from "../testdata/douglasFilterTestData";

test.describe("User verify different page filter in douglas website", () => {
  test("Perfume page filter verification", async ({
    homePage,
    perfumePage,
  }) => {
    await test.step("Navigate to Douglas page", async () => {
      await homePage.navigateToHomePage();
      await homePage.acceptAllCookies();
    });

    await test.step("Navigate to Perfume page", async () => {
      await homePage.navigateToPerfume();
    });

    await test.step("Apply filter and verify filter results", async () => {
      await perfumePage.openFilterOptions();
      await perfumePage.applyMarkeFilter(
        douglasFilterTestData.perfumeFilter.marke
      );
      await perfumePage.verifySearchResultContainsMarke(
        douglasFilterTestData.perfumeFilter.marke
      );
    });
  });

  test("Nue page filter verification", async ({ homePage, nuePage }) => {
    await test.step("Navigate to Douglas page", async () => {
      await homePage.navigateToHomePage();
      await homePage.acceptAllCookies();
    });

    await test.step("Navigate to Nue page", async () => {
      await homePage.navigateToNuePage();
    });

    await test.step("Apply filter and verify filter results", async () => {
      await nuePage.openFilterOptions();
      await nuePage.applyMarkeFilter(douglasFilterTestData.nueFilter.marke);
    });
  });

  test("Sale page filter verification", async ({ homePage, salePage }) => {
    await test.step("Navigate to Douglas page", async () => {
      await homePage.navigateToHomePage();
      await homePage.acceptAllCookies();
    });

    await test.step("Navigate to Sale page", async () => {
      await homePage.navigateToSalePage();
    });

    await test.step("Apply filter and verify filter results", async () => {
      await salePage.openFilterOptions();
      await salePage.applyMarkeFilter(douglasFilterTestData.saleFilter.marke);
    });
  });
});
