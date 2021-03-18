import { Application } from "spectron";
import path from "path";

import { setupBrowser } from "@testing-library/webdriverio";

const packageName = process.env.npm_package_name;
const app = new Application({
  path: path.join(
    process.cwd(), // This works assuming you run npm test from project root
    `out/${packageName}-darwin-x64/${packageName}.app/Contents/MacOS/${packageName}`
  ),
  port: 9156,
});

describe("App", () => {
  beforeAll(async () => {
    await app.start();
  });
  afterAll(async () => {
    if (app && app.isRunning()) await app.stop();
  });

  test("should launch app", async () => {
    const isVisible = await app.browserWindow.isVisible();
    expect(isVisible).toBe(true);
  });

  test("should display sheet title input", async () => {
    const { getByPlaceholderText } = setupBrowser(app.client);

    await getByPlaceholderText("Set sheet title..✍️");
  });
});
