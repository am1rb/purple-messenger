import { render } from "@testing-library/react";
import React from "react";
import { useField } from "@rocketseat/unform";
import UnformTextField from "./UnformTextField";

jest.mock("@rocketseat/unform");

describe("UnformTextField Component Tests", () => {
  it("Should match the snapshot when there is a simple input", () => {
    const { container } = render(<UnformTextField name="myField" />);
    expect(container).toMatchSnapshot();
  });

  it("Should match the snapshot when the field has a label", () => {
    const { container } = render(
      <UnformTextField name="myField" label="field label" />
    );
    expect(container).toMatchSnapshot();
  });

  it("Should match the snapshot when the field has a helper text", () => {
    const { container } = render(
      <UnformTextField name="myField" helperText="helper text" />
    );
    expect(container).toMatchSnapshot();
  });

  it("should register the field in unform correctly", () => {
    const registerField = jest.fn();
    const useFieldMock = (useField as jest.Mock).mockReturnValue({
      registerField,
      fieldName: "customFieldName",
    });
    render(<UnformTextField name="myField" />);
    expect(registerField).toHaveBeenCalledWith({
      name: "customFieldName",
      clearValue: expect.anything(),
      path: "value",
      ref: expect.anything(),
    });
    useFieldMock.mockClear();
  });

  it("should render the field error correctly", () => {
    const errorMessage = "field error message";
    const useFieldMock = (useField as jest.Mock).mockReturnValue({
      registerField: () => {},
      fieldName: "field",
      error: errorMessage,
    });
    const { getByTestId } = render(<UnformTextField name="myField" />);
    expect(getByTestId("mock-mui-text-field-helper-text")).toHaveTextContent(
      errorMessage
    );
    useFieldMock.mockClear();
  });

  it("should use the default value properly", () => {
    const defaultValue = "hello world";
    const useFieldMock = (useField as jest.Mock).mockReturnValue({
      registerField: () => {},
      fieldName: "field",
      defaultValue,
    });
    const { getByRole } = render(<UnformTextField name="myField" />);
    expect(getByRole("textbox")).toHaveValue(defaultValue);
    useFieldMock.mockClear();
  });
});
