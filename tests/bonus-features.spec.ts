import { test, expect } from "../fixtures/test-fixtures";

test.describe("Coffee Cart Special Features", () => {
  test("should translate coffee title to Chinese on double click", async ({
    page,
    homePage,
  }) => {
    const coffeeTitle = page.getByRole("heading", { level: 4 }).first();

    await expect(coffeeTitle).toHaveText("Espresso $10.00");
    await coffeeTitle.dblclick();
    await expect(coffeeTitle).toContainText(/[\u4e00-\u9fff]/);
  });
});

test("should open add-to-cart dialog on right click", async ({
  page,
  homePage,
}) => {
  const coffee = page.locator('div[data-test="Espresso_Macchiato"]');

  await coffee.click({ button: "right" });

  const dialog = page.locator("dialog");

  await expect(dialog).toBeVisible();

  await dialog
    .getByRole("button", {
      name: "Yes",
    })
    .click();

  await expect(page.locator('a[aria-label="Cart page"]')).toContainText("1");
});

test("should display promotional popup after adding three coffees", async ({
  page,
  homePage,
}) => {
  await homePage.addCoffee("Espresso");
  await homePage.addCoffee("Americano");

  await homePage.addCoffee("Cafe_Latte");

  const promo = page.locator("div.promo");

  await expect(promo).toBeVisible();

  await expect(promo).toContainText("Get an extra cup of Mocha for $4.");

  // Decline the promotional offer
  await promo.getByRole("button", { name: "Nah, I'll skip." }).click();

  // Verify the original three products remain in cart
  await expect(page.locator('a[aria-label="Cart page"]')).toContainText("3");
});
