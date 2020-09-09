import { useCallback, useRef } from "react";
import { debounce } from "throttle-debounce";
import { UnformTextFieldProps } from "components/UnformTextField";

export interface TextFieldEventsProps
  extends Pick<UnformTextFieldProps, "onChange" | "onKeyDown"> {
  onStartTyping?: () => void;
  onStopTyping?: () => void;
  onEnter?: () => void;
  detectTypeTime?: number;
}

function useTextFieldEvents({
  onStartTyping,
  onStopTyping,
  onEnter,
  detectTypeTime = 1500,
  onChange,
  onKeyDown,
}: TextFieldEventsProps) {
  const isTyping = useRef(false);

  const handleStartTyping = useCallback(
    debounce(detectTypeTime, true, () => {
      isTyping.current = true;
      onStartTyping?.();
    }),
    [detectTypeTime, onStartTyping]
  );
  const handleStopTyping = useCallback(
    debounce(detectTypeTime, () => {
      if (isTyping.current) {
        isTyping.current = false;
        onStopTyping?.();
      }
    }),
    [detectTypeTime, onStopTyping]
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
        onStopTyping?.();
        onEnter?.();
        event.preventDefault();
      }
      onKeyDown?.(event);
    },
    [onEnter, onKeyDown]
  );

  return {
    handleChange,
    handleKeyDown,
  };
}

export default useTextFieldEvents;
