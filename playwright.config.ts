import { defineConfig, devices } from "@playwright/test";

declare const process: { env: { CI?: string } };

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  retries: process.env.CI ? 2 : 0,

  reporter: [["list"], ["html", { open: "never" }]],

  use: {
    baseURL: "https://coffee-cart.app/",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
