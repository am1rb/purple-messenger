import React from "react";
import SendMessageForm, { SendMessageFormProps } from "./SendMessageForm";
import { renderWithStore } from "core/test";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react";
import {
  startTypingMessage,
  stopTypingMessage,
  submitMessage,
} from "@purple-messenger/core";

jest.mock("components/Unform");
jest.mock("../MessageTextField");

const sharedProps: SendMessageFormProps = {
  disabled: false,
  username: "john",
};
const sharedMessage = "Hello World!";

describe("The <SendMessageForm /> tests", () => {
  it("Should match the snapshot", () => {
    const { container } = renderWithStore(<SendMessageForm {...sharedProps} />);
    expect(container).toMatchSnapshot();
  });

  it("Should send the message by clicking on the send button", () => {
    const message = "Hello World!";
    const { getByTestId, store } = renderWithStore(
      <SendMessageForm {...sharedProps} />
    );

    userEvent.type(getByTestId("mock-message-text-field"), message);
    userEvent.click(getByTestId("mock-mui-icon-button"));

    expect(store.actions).toContainEqual(
      submitMessage(sharedProps.username!, message)
    );
  });

  it("Should send the message by pressing the enter button", () => {
    const { getByTestId, store } = renderWithStore(
      <SendMessageForm {...sharedProps} />
    );

    const messageField = getByTestId("mock-message-text-field");
    userEvent.type(messageField, sharedMessage);
    fireEvent.keyDown(messageField, { keyCode: 13 });

    expect(store.actions).toContainEqual(
      submitMessage(sharedProps.username!, sharedMessage)
    );
  });

  it("Should call startTypingMessage when something is typed", () => {
    const { getByTestId, store } = renderWithStore(
      <SendMessageForm {...sharedProps} />
    );

    const messageField = getByTestId("mock-message-text-field");
    userEvent.type(messageField, sharedMessage);

    expect(store.actions).toContainEqual(
      startTypingMessage(sharedProps.username!)
    );
  });

  it("Should call stopTypingMessage when something is typed", () => {
    jest.useFakeTimers();

    const { getByTestId, store } = renderWithStore(
      <SendMessageForm {...sharedProps} />
    );

    const messageField = getByTestId("mock-message-text-field");
    userEvent.type(messageField, sharedMessage);

    jest.runAllTimers();

    expect(store.actions).toContainEqual(
      stopTypingMessage(sharedProps.username!)
    );

    jest.clearAllTimers();
  });

  it("Should disable the text input and the button if the disable prop is passed", () => {
    const { getByTestId } = renderWithStore(
      <SendMessageForm {...sharedProps} disabled />
    );
    expect(getByTestId("mock-message-text-field")).toHaveAttribute("disabled");
    expect(getByTestId("mock-mui-icon-button")).toHaveAttribute("disabled");
  });
});
