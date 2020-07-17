import React, { useRef, useCallback } from "react";
import { debounce } from "throttle-debounce";
import UnformTextField, {
  Props as UnformTextFieldProps,
} from "components/UnformTextField";

interface Props extends Omit<UnformTextFieldProps, "multiline" | "fullWidth"> {
  onTypeStart?: () => void;
  onTypeStop?: () => void;
  onEnter?: () => void;
  detectTypeTime?: number;
}

function MessageTextField({
  onTypeStart,
  onTypeStop,
  detectTypeTime = 1500,
  onEnter,
  onChange,
  onKeyDown,
  ...other
}: Props) {
  const isTyping = useRef(false);
  const handleStartTyping = useCallback(
    debounce(detectTypeTime, true, () => {
      isTyping.current = true;
      onTypeStart?.();
    }),
    [detectTypeTime, onTypeStart]
  );
  const handleStopTyping = useCallback(
    debounce(detectTypeTime, () => {
      if (isTyping.current) {
        isTyping.current = false;
        onTypeStop?.();
      }
    }),
    [detectTypeTime, onTypeStop]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      handleStartTyping();
      handleStopTyping();
      onChange?.(event);
    },
    [handleStartTyping, handleStopTyping, onChange]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.keyCode === 13 && !event.shiftKey) {
        isTyping.current = false;
        onTypeStop?.();
        onEnter?.();
        event.preventDefault();
      }
      onKeyDown?.(event);
    },
    [onEnter, onKeyDown]
  );

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
