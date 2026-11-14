# Coffee Cart Automation

This project contains a Playwright-based UI automation suite for the Coffee Cart application at https://coffee-cart.app/.

The goal is to verify the main customer journey and key interactive behaviors in a maintainable, reusable, and CI-friendly way.

## Project Structure

- `tests/` - automated test specs
- `pages/` - Page Object Model (POM) classes for app screens
- `fixtures/` - Playwright fixtures for setup and shared page objects
- `data/` - test data separated from test logic
- `.github/workflows/` - GitHub Actions CI pipeline
- `playwright.config.ts` - Playwright configuration

## Tech Stack

- TypeScript
- Playwright
- GitHub Actions

## Prerequisites

Before running the tests, make sure you have:

- Node.js 20+
- npm

## Installation

```bash
npm install
```

## Running Tests

Run the whole suite:

```bash
npm test
```

Run in headed mode (visible browser):

```bash
npm run test:headed
```

Open Playwright UI mode:

```bash
npm run test:ui
```

Open the HTML report:

```bash
npm run report
```

## Test Coverage

The project currently covers:

- Add product to cart
- Handle promo popup when applicable
- Proceed to checkout
- Submit payment details
- Verify successful purchase
- Bonus interactions such as:
  - double-click coffee title translation
  - right-click add-to-cart dialog
  - promo popup on every 3rd item added

## Framework Design

This project follows a foundational Playwright framework pattern that is safe for a team of junior engineers:

- Page Object Model (POM) separates UI actions from test logic
- Fixtures manage setup and shared state
- Test data is kept separate from assertions and workflows
- Automatic waiting is used instead of arbitrary `sleep()` calls
- Selectors are centralized in page objects to reduce duplication and maintenance

## CI

The repository includes a GitHub Actions workflow to run the Playwright suite automatically on push, pull request, and manual trigger.

See `.github/workflows/playwright.yml`.

## Notes for Contributors

When adding new tests:

1. Reuse the existing page objects instead of writing raw selectors in tests.
2. Keep test data in `data/`.
3. Prefer Playwright's built-in auto-waiting and assertions.
4. Keep tests readable and behavior-focused.
5. Avoid hardcoded sleeps or timing assumptions.

## Example Workflow

```ts
await homePage.addCoffee("Cappuccino");
await homePage.handlePromoPopup();
await homePage.openCart();
await cartPage.proceedToCheckout();
await checkoutPage.submitPayment(customerData.name, customerData.email);
await expect(checkoutPage.successMessage).toContainText(
  "Thanks for your purchase.",
);
```

## Notes

AI tools were used as a development aid to improve the test automation framework, refine Playwright scripts, troubleshoot errors, and optimize code structure. All generated suggestions were reviewed, tested, and adjusted as needed to meet the project requirements.
