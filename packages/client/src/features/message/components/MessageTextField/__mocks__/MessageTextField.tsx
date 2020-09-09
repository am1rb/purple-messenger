import React from "react";
import useTextFieldEvents, {
  TextFieldEventsProps,
} from "../../useTextFieldEvents";

type InputProps = React.HTMLAttributes<HTMLInputElement>;
export type MessageTextFieldProps = Omit<InputProps, "onChange" | "onKeyDown"> &
  TextFieldEventsProps<InputProps>;

function MessageTextField({
  onStartTyping,
  onStopTyping,
  detectTypeTime,
  onEnter,
  onChange,
  onKeyDown,
  ...other
}: MessageTextFieldProps) {
  const { handleChange, handleKeyDown } = useTextFieldEvents<InputProps>({
    onStartTyping,
    onStopTyping,
    detectTypeTime,
    onEnter,
    onChange,
    onKeyDown,
  });

  return (
    <input
      {...other}
      data-testid="mock-message-text-field"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
}

export default MessageTextField;
