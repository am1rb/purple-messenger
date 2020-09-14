import React from "react";
import withAuthBase from "../withAuthBase";
import RedirectToRoot from "../RedirectToRoot";
import withGuestPage from "./withGuestPage";

jest.mock("../withAuthBase");
jest.mock("../RedirectToRoot");

function GuestComponent() {
  return <span data-testid="mock-auth-component" />;
}

describe("The withGuestPage tests", () => {
  it("Should pass the auth as first and the SignInForm as second arguments", () => {
    withGuestPage(GuestComponent);
    expect(withAuthBase).toHaveBeenCalledWith(RedirectToRoot, GuestComponent);
  });
});
