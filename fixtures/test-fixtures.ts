import { test as base } from "@playwright/test";

import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

type CoffeeFixtures = {
  homePage: HomePage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<CoffeeFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);

    await homePage.navigate();

    await use(homePage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);

    await use(cartPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);

    await use(checkoutPage);
  },
});

export { expect } from "@playwright/test";
