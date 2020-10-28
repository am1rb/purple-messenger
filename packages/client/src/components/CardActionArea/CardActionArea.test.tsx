import React from "react";
import { render } from "@testing-library/react";
import CardActionArea from "./CardActionArea";

jest.mock("components/withButtonLink");

describe("CardActionArea Component Tests", () => {
  it("Should match the snapshot", () => {
    const { container } = render(
      <CardActionArea>custom children</CardActionArea>
    );
    expect(container).toMatchSnapshot();
  });
});
