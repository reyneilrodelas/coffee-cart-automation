import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly coffeeProducts: Locator;
  readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.coffeeProducts = page.locator(".cup-body");

    this.cartButton = page.getByRole("link", {
      name: /cart/i,
    });
  }

  async navigate() {
    await this.page.goto("/");
  }

  async addCoffee(coffeeName: string) {
    const coffee = this.page.locator(`[data-test="${coffeeName}"]`);

    await coffee.click();
  }
  async openCart() {
    await this.cartButton.click();
  }

  async handlePromoPopup() {
    const promo = this.page.locator("div.promo");

    if (await promo.isVisible().catch(() => false)) {
      await promo.locator("button.no").click();
    }
  }
}
