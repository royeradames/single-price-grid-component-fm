import { expect, test } from "@playwright/test";

test("renders the supplied community, subscription and reasons copy", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Single price grid component | Royer Adames");
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1, name: "Join our community" })).toBeVisible();
  await expect(page.getByText("30-day, hassle-free money back guarantee")).toBeVisible();
  await expect(page.getByText(/Gain access to our full library of tutorials/)).toBeVisible();
  await expect(page.getByRole("heading", { level: 2 })).toHaveText(["Monthly Subscription", "Why Us"]);
  await expect(page.getByText("$29", { exact: true })).toBeVisible();
  await expect(page.getByText("per month", { exact: true })).toBeVisible();
  await expect(page.getByText("Full access for less than $1 a day")).toBeVisible();
  await expect(page.getByRole("region", { name: "Why Us" }).getByRole("listitem")).toHaveText([
    "Tutorials by industry experts", "Peer & expert code review", "Coding exercises", "Access to our GitHub repos",
    "Community forum", "Flashcard decks", "New videos every week",
  ]);
});

test("declares one site name in the footer, og:site_name and WebSite JSON-LD", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".site-name")).toHaveText("Single price grid component");
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute("content", "Single price grid component");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /\$29 monthly plan/);
  const jsonLd = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() ?? "{}");
  expect(jsonLd).toEqual({ "@context": "https://schema.org", "@type": "WebSite", name: "Single price grid component", url: "https://single-price-grid-component-fm.royeradames.com" });
});

test("uses the style guide colours for each panel", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".community")).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(page.getByRole("region", { name: "Monthly Subscription" })).toHaveCSS("background-color", "rgb(42, 179, 177)");
  await expect(page.getByRole("region", { name: "Why Us" })).toHaveCSS("background-color", "rgb(74, 191, 189)");
  await expect(page.getByRole("heading", { name: "Join our community" })).toHaveCSS("color", "rgb(42, 179, 177)");
  await expect(page.getByText("30-day, hassle-free money back guarantee")).toHaveCSS("color", "rgb(192, 223, 51)");
});

test("sign up is an honest demo with hover and keyboard states", async ({ page }) => {
  const writes: string[] = [];
  page.on("request", request => { if (request.method() !== "GET") writes.push(request.url()); });
  await page.goto("/");
  const button = page.getByRole("button", { name: "Sign Up" });
  const status = page.getByRole("status");
  await expect(status).toHaveText("");
  await button.hover();
  await expect(button).toHaveCSS("background-color", "rgb(166, 196, 31)");
  await page.mouse.move(0, 0);
  await button.focus();
  await expect(button).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Enter");
  await expect(status).toHaveText("Demo only: sign-up isn't connected, so nothing is sent.");
  await expect(button).toBeEnabled();
  await expect(button).toBeFocused();
  expect(writes).toEqual([]);
});

test("stacks on mobile and splits the lower panels side by side from tablet up", async ({ page }) => {
  const box = async (name: string) => (await page.getByRole("region", { name }).boundingBox())!;
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/");
  let subscription = await box("Monthly Subscription");
  let why = await box("Why Us");
  expect(why.y).toBeGreaterThanOrEqual(subscription.y + subscription.height - 1);
  expect(Math.round((await page.locator(".pricing").boundingBox())!.width)).toBe(311);
  for (const width of [768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    subscription = await box("Monthly Subscription");
    why = await box("Why Us");
    expect(Math.abs(subscription.y - why.y)).toBeLessThan(1);
    expect(why.x).toBeGreaterThan(subscription.x);
    expect(Math.round((await page.locator(".pricing").boundingBox())!.width)).toBe(635);
  }
});

test("fits narrow and enlarged layouts with the family text and target floors", async ({ page }) => {
  for (const width of [320, 375, 400, 640, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const smallText = await page.locator("h1, h2, p, span, li, button, footer, footer a").evaluateAll(elements =>
      elements.filter(element => element.getClientRects().length > 0 && parseFloat(getComputedStyle(element).fontSize) < 16).map(element => element.textContent));
    expect(smallText).toEqual([]);
    for (const control of await page.locator("a, button").all()) {
      expect((await control.boundingBox())?.height).toBeGreaterThanOrEqual(44);
    }
  }
  await page.setViewportSize({ width: 640, height: 900 });
  await page.addStyleTag({ content: "html { font-size: 200%; }" });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
