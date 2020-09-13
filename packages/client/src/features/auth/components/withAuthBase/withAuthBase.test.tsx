import React from "react";
import withAuthBase from "./withAuthBase";
import { renderWithStore, InitialStore } from "core/test";

jest.mock("../VerifyToken");

function GuestComponent() {
  return <span data-testid="mock-guest-component" />;
}

function UserComponent() {
  return <span data-testid="mock-user-component" />;
}

const AuthComponent = withAuthBase(UserComponent, GuestComponent);

describe("The withAuthBase tests", () => {
  it("Should render GuestComponent properly", () => {
    const { getByTestId } = renderWithStore(<AuthComponent />);
    expect(getByTestId("mock-guest-component")).toBeInTheDocument();
  });

  it("Should render VerifyToken properly", () => {
    const initStore: InitialStore = {
      auth: {
        token: "sample token",
        isAuthenticated: false,
        authError: "",
      },
    };
    const { getByTestId } = renderWithStore(<AuthComponent />, initStore);
    expect(getByTestId("mock-verify-token")).toBeInTheDocument();
  });

  it("Should render UserComponent properly", () => {
    const initStore: InitialStore = {
      auth: {
        token: "sample token",
        isAuthenticated: true,
        authError: "",
      },
    };
    const { getByTestId } = renderWithStore(<AuthComponent />, initStore);
    expect(getByTestId("mock-user-component")).toBeInTheDocument();
  });
});
