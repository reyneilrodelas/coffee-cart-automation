import { test, expect } from "../fixtures/test-fixtures";
import { customerData } from "../data/customer-data";

test.describe("Coffee Cart Checkout", () => {
  test("should successfully purchase a coffee", async ({
    homePage,
    cartPage,
    checkoutPage,
  }) => {
    // Step 1: Add a coffee
    await homePage.addCoffee("Cappuccino");

    // Step 2: Handle promo popup if applicable
    await homePage.handlePromoPopup();

    // Step 3: Verify cart count
    await expect(
      homePage.page.locator('a[aria-label="Cart page"]'),
    ).toContainText("1");

    // Step 4: Open cart
    await homePage.openCart();

    // Step 5: Verify checkout button
    await expect(cartPage.checkoutButton).toBeVisible();

    // Step 6: Proceed to checkout
    await cartPage.proceedToCheckout();

    // Step 7: Submit customer details
    await checkoutPage.submitPayment(customerData.name, customerData.email);

    // Step 8: Verify successful purchase
    await expect(checkoutPage.successMessage).toContainText(
      "Thanks for your purchase.",
    );
  });
});
