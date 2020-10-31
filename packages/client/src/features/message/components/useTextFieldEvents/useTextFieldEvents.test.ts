import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import useTextFieldEvents from "./useTextFieldEvents";

type InputProps = React.HTMLAttributes<HTMLInputElement>;

const sharedEvent = {
  keyCode: 13,
  preventDefault: () => {},
};
const sharedChangeEvent = (sharedEvent as Partial<
  React.ChangeEvent<HTMLInputElement>
>) as React.ChangeEvent<HTMLInputElement>;
const sharedKeyDownEvent = (sharedEvent as Partial<
  React.KeyboardEvent<HTMLInputElement>
>) as React.KeyboardEvent<HTMLInputElement>;

describe("The useTextFieldEvents hook tests", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.clearAllTimers());

  it("Should call onChange event if the handleChange is called", () => {
    const handleChange = jest.fn();
    const { result } = renderHook(() =>
      useTextFieldEvents<InputProps>({ onChange: handleChange })
    );
    result.current.handleChange(sharedChangeEvent);
    expect(handleChange).toHaveBeenCalled();
  });

  it("Should call onKeyDown event if the handleKeyDown is called", () => {
    const handleKeyDown = jest.fn();
    const { result } = renderHook(() =>
      useTextFieldEvents<InputProps>({ onKeyDown: handleKeyDown })
    );
    result.current.handleKeyDown(sharedKeyDownEvent);
    expect(handleKeyDown).toHaveBeenCalled();
  });

  it("Should call onStartTyping properly", () => {
    const handleStartTyping = jest.fn();
    const { result } = renderHook(() =>
      useTextFieldEvents<InputProps>({ onStartTyping: handleStartTyping })
    );
    result.current.handleChange(sharedChangeEvent);
    expect(handleStartTyping).toHaveBeenCalled();
  });

  it("Should call onStopTyping properly", () => {
    const handleStopTyping = jest.fn();
    const { result } = renderHook(() =>
      useTextFieldEvents<InputProps>({ onStopTyping: handleStopTyping })
    );
    result.current.handleChange(sharedChangeEvent);
    jest.runAllTimers();
    expect(handleStopTyping).toHaveBeenCalled();
  });

  it("Should call onEnter properly and then call onStopTyping after that", () => {
    const handleEnter = jest.fn();
    const handleStopTyping = jest.fn();

    const { result } = renderHook(() =>
      useTextFieldEvents<InputProps>({
        onStopTyping: handleStopTyping,
        onEnter: handleEnter,
      })
    );
    result.current.handleKeyDown(sharedKeyDownEvent);

    jest.runAllTimers();

    expect(handleEnter).toHaveBeenCalled();
    expect(handleStopTyping).toHaveBeenCalled();
  });

  it("Should call onChange, onStartTyping, and onStopTyping properly", () => {
    const handleStartTyping = jest.fn();
    const handleStopTyping = jest.fn();
    const handleChange = jest.fn();

    const { result } = renderHook(() =>
      useTextFieldEvents<InputProps>({
        onStartTyping: handleStartTyping,
        onStopTyping: handleStopTyping,
        onChange: handleChange,
      })
    );
    result.current.handleChange(sharedChangeEvent);

    expect(handleChange).toHaveBeenCalled();
    expect(handleStartTyping).toHaveBeenCalled();

    jest.runAllTimers();
    expect(handleStopTyping).toHaveBeenCalled();
  });
});
