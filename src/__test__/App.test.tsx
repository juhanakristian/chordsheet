import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ipcMain } from "../../__mocks__/electron";

import App from "../App";

describe("app", () => {
  beforeAll(() => {
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
      ];
    });
  });
  test("renders app without crashing", () => {
    render(<App />);
    expect(screen.getByRole("search")).not.toBeNull();
  });

  test("sidebar opens when print button clicked", () => {});
});
