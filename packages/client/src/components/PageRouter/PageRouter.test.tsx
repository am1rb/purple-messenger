import React from "react";
import { render, screen } from "@testing-library/react";
import PageRouter from "./PageRouter";

describe("PageRouter Component Tests", () => {
  it("Should match the snapshot", () => {
    render(<PageRouter />);
    screen.debug();
  });
});
