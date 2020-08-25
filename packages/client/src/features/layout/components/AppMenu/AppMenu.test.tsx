import React from "react";
import fireEvent from "@testing-library/user-event";
import { renderWithStore, InitialStore } from "core/test";
import { signOut } from "@purple-messenger/core";
import AppMenu from "./AppMenu";

jest.mock("@purple-messenger/core");

const sharedStore: InitialStore = {
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
};

describe("The <AppMenu /> tests", () => {
  afterAll(() => jest.clearAllMocks());

  it("Should match the snapshot", () => {
    const { container } = renderWithStore(<AppMenu />, sharedStore);
    expect(container).toMatchSnapshot();
  });

  it("Should call signOut action when the button is clicked", () => {
    const { getByText } = renderWithStore(<AppMenu />, sharedStore);
    fireEvent.click(getByText("signOut"));
    expect(signOut).toHaveBeenCalled();
  });
});
