import React, { useRef, useCallback } from "react";
import UnformTextField, {
  UnformTextFieldProps,
} from "components/UnformTextField";
import useTextFieldEvents, {
  TextFieldEventsProps,
} from "../useTextFieldEvents";

export interface MessageTextFieldProps
  extends Omit<
      UnformTextFieldProps,
      "multiline" | "fullWidth" | "onChange" | "onKeyDown"
    >,
    TextFieldEventsProps {}

function MessageTextField({
  onStartTyping,
  onStopTyping,
  detectTypeTime,
  onEnter,
  onChange,
  onKeyDown,
  ...other
}: MessageTextFieldProps) {
  const { handleChange, handleKeyDown } = useTextFieldEvents({
    onStartTyping,
    onStopTyping,
    detectTypeTime,
    onEnter,
    onChange,
    onKeyDown,
  });

  return (
    <UnformTextField
      {...other}
      multiline
      fullWidth
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
}

export default MessageTextField;
