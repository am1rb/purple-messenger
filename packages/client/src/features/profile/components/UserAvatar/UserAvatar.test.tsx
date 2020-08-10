import React from "react";
import UserAvatar from "./UserAvatar";
import { renderWithStore } from "core/test";

describe("The <UserAvatar /> tests", () => {
  it("Should match the snapshot", () => {
    const { container } = renderWithStore(<UserAvatar />, {
      profile: {
        profileInfo: {
          bio: "1618 Novvi Parkway",
          email: "bi@mipu.bi",
          firstName: "Logan",
          lastName: "Swanson",
          id: 1,
          image: "https://picsum.photos/200",
          username: "owens",
        },
      },
    });
    expect(container).toMatchSnapshot();
  });
});
