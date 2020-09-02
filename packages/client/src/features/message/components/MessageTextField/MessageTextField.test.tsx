import React from "react";
import { render, wait, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MessageTextField, { MessageTextFieldProps } from "./MessageTextField";

jest.mock("components/UnformTextField");

const sharedProps: MessageTextFieldProps = {
  name: "field-name",
  detectTypeTime: 200,
};

describe("The <UnformTextField /> tests", () => {
  it("Should match the snapshot", () => {
    const { container } = render(<MessageTextField {...sharedProps} />);
    expect(container).toMatchSnapshot();
  });

  it("Should call onStartTyping properly", () => {
    const handleStartTyping = jest.fn();
    const { getByTestId } = render(
      <MessageTextField {...sharedProps} onStartTyping={handleStartTyping} />
    );
    userEvent.type(getByTestId("mock-unform-text-field"), "Hi");
    expect(handleStartTyping).toHaveBeenCalled();
  });

  it("Should call onStopTyping properly", async () => {
    const handleStopTyping = jest.fn();
    const { getByTestId } = render(
      <MessageTextField {...sharedProps} onStopTyping={handleStopTyping} />
    );
    userEvent.type(getByTestId("mock-unform-text-field"), "Hi");
    await wait(() => expect(handleStopTyping).toHaveBeenCalled());
  });

  it("Should call onEnter properly", () => {
    const handleEnter = jest.fn();
    const { getByTestId } = render(
      <MessageTextField {...sharedProps} onEnter={handleEnter} />
    );

    const input = getByTestId("mock-unform-text-field");

    userEvent.type(input, "Hello");
    fireEvent.keyDown(input, { key: "Enter", keyCode: 13 });

    expect(handleEnter).toHaveBeenCalled();
  });
});
