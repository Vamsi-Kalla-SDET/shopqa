import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  console.log("Before each test");
  await page.goto("/");
});

test("valid user", async ({ page }) => {
  await page.getByTestId("username").fill("standard_user");
  await page.getByTestId("password").fill("secret_sauce");
  await page.getByTestId("login-button").click();
  await expect(page.getByTestId("primary-header")).toContainText("Swag Labs");
  await expect(page).toHaveURL("/inventory.html");
});

test("lockedout user", async ({ page }) => {
  await page.getByTestId("username").fill("locked_out_user");
  await page.getByTestId("password").fill("secret_sauce");
  await page.getByTestId("login-button").click();
  await expect(page.getByTestId("error")).toContainText(
    "Epic sadface: Sorry, this user has been locked out.",
  );
  await expect(page).toHaveURL("/");
});

test("empty password", async ({ page }) => {
  await page.getByTestId("username").fill("standard_user");
  await page.getByTestId("login-button").click();
  await expect(page.getByTestId("error")).toHaveText(
    "Epic sadface: Password is required",
  );
  await expect(page).toHaveURL("/");
});
