import React from "react";
import { render } from "@testing-library/react";
import Layout from ".";

jest.mock("features/layout/components/AppMenu");

describe("The <Layout /> tests", () => {
  it("Should match the snapshot", () => {
    const { container } = render(<Layout>layout children</Layout>);
    expect(container).toMatchSnapshot();
  });
});
