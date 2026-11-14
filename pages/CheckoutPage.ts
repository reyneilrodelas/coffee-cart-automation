import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.nameInput = page.locator("#name");
    this.emailInput = page.locator("#email");

    this.submitButton = page.locator("#submit-payment");

    this.successMessage = page.locator("div.success");
  }

  async submitPayment(name: string, email: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);

    await this.submitButton.click();
  }

  async verifySuccess() {
    return await this.successMessage.isVisible();
  }
}
