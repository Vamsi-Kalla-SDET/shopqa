import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  console.log("Before each test");
  await page.goto("/");
});

test("valid user", async ({ page }) => {
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="primary-header"]')).toContainText(
    "Swag Labs",
  );
});

// import { test, expect } from '@playwright/test';

test("lockedout user", async ({ page }) => {
  await page.locator('[data-test="username"]').fill("locked_out_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toContainText(
    "Epic sadface: Sorry, this user has been locked out.",
  );
});

test("empty password", async ({ page }) => {
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.getByRole("form", { name: "Login" })).toContainText(
    "Epic sadface: Password is required",
  );
});
