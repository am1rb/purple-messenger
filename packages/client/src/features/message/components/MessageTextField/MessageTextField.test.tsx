import React from "react";
import { render, wait, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MessageTextField, { MessageTextFieldProps } from "./MessageTextField";
import useTextFieldEvents from "../useTextFieldEvents";

jest.mock("../useTextFieldEvents");

jest.mock("components/UnformTextField");

const sharedProps: MessageTextFieldProps = {
  name: "field-name",
  detectTypeTime: 200,
};

describe("The <UnformTextField /> tests", () => {
  beforeEach(() => {
    (useTextFieldEvents as jest.Mock).mockReturnValue({
      handleChange: () => {},
      handleKeyDown: () => {},
    });
  });

  it("Should match the snapshot", () => {
    const { container } = render(<MessageTextField {...sharedProps} />);
    expect(container).toMatchSnapshot();
  });

  it("Should call the handleChange and handleKeyDown events properly", () => {
    const handleChange = jest.fn();
    const handleKeyDown = jest.fn();

    (useTextFieldEvents as jest.Mock).mockReturnValue({
      handleChange,
      handleKeyDown,
    });

    const { getByTestId } = render(<MessageTextField {...sharedProps} />);
    userEvent.type(getByTestId("mock-unform-text-field"), "Hello");

    expect(handleChange).toHaveBeenCalled();
    expect(handleKeyDown).toHaveBeenCalled();
  });
});
