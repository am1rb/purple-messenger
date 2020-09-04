import React from "react";
import App from "./App";
import { renderWithStore } from "core/test";

jest.mock("components/PageRouter");

it("renders without crashing", () => {
  const { container } = renderWithStore(<App />, {});
  expect(container).toMatchSnapshot();
});
