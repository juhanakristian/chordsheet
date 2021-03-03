import { Application } from "spectron";
import path from "path";

import { setupBrowser } from "@testing-library/webdriverio";

const app = new Application({
  path: path.join(
    __dirname,
    "..",
    "..",
    "out",
    "chordsheet-darwin-x64/chordsheet.app/Contents/MacOS/chordsheet"
  ),
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
