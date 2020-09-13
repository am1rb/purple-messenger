import React from "react";
import { verifyToken } from "@purple-messenger/core";
import { renderWithStore } from "core/test";
import VerifyToken from "./VerifyToken";

describe("The <VerifyToken /> tests", () => {
  it("Should match the snapshot", () => {
    const { container } = renderWithStore(<VerifyToken token="" />);
    expect(container).toMatchSnapshot();
  });

  it("Should call verifyToken on mount event", () => {
    const token = "sample token";
    renderWithStore(<VerifyToken token={token} />);
    expect(verifyToken).toHaveBeenCalledWith(token);
  });
});
