import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import user from "@testing-library/user-event";
import { ipcMain } from "../../__mocks__/electron";

import App from "../App";

describe("app", () => {
  beforeAll(() => {
    // vexchords.draw.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).SVGElement.prototype.getBBox = () => ({
      x: 0,
      y: 0,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  test("sidebar opens when preview button is clicked", () => {
    render(<App />);
    user.click(screen.getByRole("button", { name: /preview/i }));
    expect(screen.getByRole("heading", { name: /preview/i })).toBeVisible();
  });

  test("shows filtered chords after typing into search field", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.queryByRole("heading", { name: /Am/i })).not.toBeNull()
    );

    user.type(screen.getByRole("search"), "Am");

    expect(screen.queryByRole("heading", { name: /Am/i })).not.toBeNull();
    expect(screen.queryByRole("heading", { name: /C/i })).toBeNull();
  });

  test("shows added chord in sheet", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.queryByRole("heading", { name: /Am/i })).not.toBeNull()
    );

    user.hover(screen.getByRole("heading", { name: /Am/i }));
    user.click(screen.getByRole("button", { name: /add/i }));

    user.click(screen.getByRole("heading", { name: /preview/i }));

    expect(screen.getByTestId(/sheet-chord-Am-10213242506x/i)).not.toBeNull();
  });

  test("clears the selected chords when clear is clicked", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.queryByRole("heading", { name: /Am/i })).not.toBeNull()
    );

    user.hover(screen.getByRole("heading", { name: /Am/i }));
    user.click(screen.getByRole("button", { name: /add/i }));

    user.click(screen.getByRole("heading", { name: /preview/i }));
    user.click(screen.getByRole("button", { name: /clear/i }));

    expect(screen.queryByTestId(/sheet-chord-Am-10213242506x/i)).toBeNull();
  });

  test("shows a icon with number of chords added when a chord is selected", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.queryByRole("heading", { name: /Am/i })).not.toBeNull()
    );

    user.hover(screen.getByRole("heading", { name: /Am/i }));
    user.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByTestId("selected-count")).toHaveTextContent("1");
  });
});
