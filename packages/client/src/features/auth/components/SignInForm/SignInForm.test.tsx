import React from "react";
import userEvent from "@testing-library/user-event";
import { signIn, setAuthError } from "@purple-messenger/core";
import { renderWithStore } from "core/test";
import SignInForm from "./SignInForm";

jest.mock("components/Unform");
jest.mock("components/UnformTextField");

describe("The <SignInForm /> tests", () => {
  it("Should match the snapshot", () => {
    const { container } = renderWithStore(<SignInForm />);
    expect(container).toMatchSnapshot();
  });

  it("Should call signIn action when the form is submitted", () => {
    const username = "john@doe.com";
    const password = "strong-password";

    const { getByLabelText, getByTestId, store } = renderWithStore(
      <SignInForm />
    );

    userEvent.type(getByLabelText("Email"), username);
    userEvent.type(getByLabelText("Password"), password);

    userEvent.click(getByTestId("mock-mui-button"));

    expect(store.actions).toContainEqual(setAuthError(""));
    expect(store.actions).toContainEqual(signIn(username, password));
  });
});
