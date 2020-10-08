import React from "react";
import fireEvent from "@testing-library/user-event";
import { sampleProfileInfo, signOut } from "@purple-messenger/core";
import { renderWithStore, InitialStore } from "core/test";
import AppMenu from "./AppMenu";

const sharedStore: InitialStore = {
  profile: sampleProfileInfo,
};

describe("The <AppMenu /> tests", () => {
  it("Should match the snapshot", () => {
    const { container } = renderWithStore(<AppMenu />, sharedStore);
    expect(container).toMatchSnapshot();
  });

  it("Should call signOut action when the button is clicked", () => {
    const { getByText, store } = renderWithStore(<AppMenu />, sharedStore);
    fireEvent.click(getByText("signOut"));
    expect(store.actions).toContainEqual(signOut());
  });
});
