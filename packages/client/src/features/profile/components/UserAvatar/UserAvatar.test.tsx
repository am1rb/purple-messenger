import React from "react";
import { sampleProfileInfo } from "@purple-messenger/core";
import { renderWithStore } from "core/test";
import UserAvatar from "./UserAvatar";

describe("The <UserAvatar /> tests", () => {
  it("Should match the snapshot", () => {
    const { container } = renderWithStore(<UserAvatar />, {
      profile: sampleProfileInfo,
    });
    expect(container).toMatchSnapshot();
  });
});
