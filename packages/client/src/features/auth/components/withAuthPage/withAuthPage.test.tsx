import React from "react";
import withAuthBase from "../withAuthBase/withAuthBase";
import SignInForm from "features/auth/components/SignInForm";
import withAuthPage from "./withAuthPage";

jest.mock("../withAuthBase/withAuthBase");
jest.mock("features/auth/components/SignInForm");

function AuthComponent() {
  return <span data-testid="mock-auth-component" />;
}

describe("The withAuthPage tests", () => {
  it("Should pass the auth as first and the SignInForm as second arguments", () => {
    withAuthPage(AuthComponent);
    expect(withAuthBase).toHaveBeenCalledWith(AuthComponent, SignInForm);
  });
});
