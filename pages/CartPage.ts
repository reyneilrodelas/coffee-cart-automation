import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;

    this.checkoutButton = page.locator('button[data-test="checkout"]');

    this.cartItems = page.locator(".list-item");
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async getTotal() {
    return await this.checkoutButton.innerText();
  }
}
