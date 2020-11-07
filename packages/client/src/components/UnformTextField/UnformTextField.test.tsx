import React from "react";
import { render, screen, act } from "@testing-library/react";
import { useField } from "@rocketseat/unform";
import UnformTextField from "./UnformTextField";

describe("UnformTextField Component Tests", () => {
  beforeEach(() => {
    (useField as jest.Mock).mockReturnValue({
      fieldName: "fieldName",
      registerField: () => {},
      defaultValue: "defaultValue",
      error: "",
    });
  });

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

  it("Should register the field in unform correctly", () => {
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

  it("Should render the field error correctly", () => {
    const errorMessage = "field error message";
    const useFieldMock = (useField as jest.Mock).mockReturnValue({
      registerField: () => {},
      fieldName: "field",
      error: errorMessage,
    });
    render(<UnformTextField name="myField" />);
    expect(
      screen.getByTestId("mock-mui-text-field-helper-text")
    ).toHaveTextContent(errorMessage);
    useFieldMock.mockClear();
  });

  it("Should use the default value properly", () => {
    const defaultValue = "hello world";
    const useFieldMock = (useField as jest.Mock).mockReturnValue({
      registerField: () => {},
      fieldName: "field",
      defaultValue,
    });
    render(<UnformTextField name="myField" />);
    expect(screen.getByRole("textbox")).toHaveValue(defaultValue);
    useFieldMock.mockClear();
  });

  it("Should clear the input value correctly", () => {
    const defaultValue = "hello world";
    const clearValue = jest.fn();
    const useFieldMock = (useField as jest.Mock).mockReturnValue({
      registerField: ({ clearValue: clearValueProp }: any) => {
        clearValue.mockImplementation(clearValueProp);
      },
      fieldName: "field",
      defaultValue,
    });
    render(<UnformTextField name="myField" />);

    act(() => {
      clearValue();
    });

    expect(screen.getByRole("textbox")).toHaveValue("");
    useFieldMock.mockClear();
  });
});
