import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import user from "@testing-library/user-event";
import { ipcMain } from "../../__mocks__/electron";

import App from "../App";

describe("app", () => {
  beforeAll(() => {
    (window as any).SVGElement.prototype.getBBox = () => ({
      x: 0,
      y: 0,
    });

    (window as any).SVGElement.prototype.getComputedTextLength = () => 200;

    ipcMain.handle("read-config", () => {
      return [
        {
          name: "C",
          chord: [
            [1, 0],
            [2, 1],
            [3, 0],
            [4, 2],
            [5, 3],
            [6, "x"],
          ],
        },
        {
          name: "Am",
          chord: [
            [1, 0],
            [2, 1],
            [3, 2],
            [4, 2],
            [5, 0],
            [6, "x"],
          ],
        },
      ];
    });
  });

  test("renders without crashing", () => {
    render(<App />);
    expect(screen.getByRole("search")).not.toBeNull();
  });

  test("sidebar opens when print button clicked", () => {
    render(<App />);
    user.click(screen.getByRole("button", { name: /preview/i }));
    expect(screen.getByRole("heading", { name: /preview/i })).toBeVisible();
  });

  test("shows filtered chords after typing into search field", async () => {
    render(<App />);
    user.type(screen.getByRole("search"), "Am");
    const am = await screen.findByRole("heading", { name: /Am/i });
    const c = await screen.queryByRole("heading", { name: "C" });

    expect(am).not.toBeNull();
    expect(c).toBeNull();
  });

  test("shows added chord in sheet", async () => {
    render(<App />);
    //FIXME: Depends on search working
    user.type(screen.getByRole("search"), "Am");

    user.hover(await screen.findByRole("heading", { name: /Am/i }));
    const am = await screen.findByRole("button", { name: /add/i });
    user.click(am);

    user.click(screen.getByRole("heading", { name: /preview/i }));

    const chord = screen.getByTestId(/sheet-chord-Am-10213242506x/i);
    expect(chord).not.toBeNull();
  });

  test("clears the selected chords when clear is clicked", async () => {
    render(<App />);
    //FIXME: Depends on search working
    user.type(screen.getByRole("search"), "Am");

    user.hover(await screen.findByRole("heading", { name: /Am/i }));
    const am = await screen.findByRole("button", { name: /add/i });
    user.click(am);

    user.click(screen.getByRole("heading", { name: /preview/i }));

    user.click(screen.getByRole("button", { name: /Clear/i }));

    const chord = screen.queryByTestId(/sheet-chord-Am-10213242506x/i);
    expect(chord).toBeNull();
  });
});
