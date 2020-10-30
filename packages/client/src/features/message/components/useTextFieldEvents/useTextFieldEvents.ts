import { useCallback, useRef } from "react";
import { debounce } from "throttle-debounce";

interface BaseInputEvents {
  onChange?: (...args: any) => any;
  onKeyDown?: (...args: any) => any;
}

export type TextFieldEventsProps<T extends BaseInputEvents> = {
  onStartTyping?: () => void;
  onStopTyping?: () => void;
  onEnter?: () => void;
  detectTypeTime?: number;
} & Pick<T, "onChange" | "onKeyDown">;

function useTextFieldEvents<T extends BaseInputEvents>({
  onStartTyping,
  onStopTyping,
  onEnter,
  detectTypeTime = 1500,
  onChange,
  onKeyDown,
}: TextFieldEventsProps<T>) {
  const isTyping = useRef(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleStartTyping = useCallback(
    debounce(detectTypeTime, true, () => {
      isTyping.current = true;
      onStartTyping?.();
    }),
    [detectTypeTime, onStartTyping]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleStopTyping = useCallback(
    debounce(detectTypeTime, () => {
      isTyping.current = false;
      onStopTyping?.();
    }),
    [detectTypeTime, onStopTyping]
  );

  const handleChange = useCallback(
    (...args: any) => {
      handleStartTyping();
      handleStopTyping();
      onChange?.(...args);
    },
    [handleStartTyping, handleStopTyping, onChange]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, ...args: any) => {
      if (event.keyCode === 13 && !event.shiftKey) {
        isTyping.current = false;
        onStopTyping?.();
        onEnter?.();
        event.preventDefault();
      }
      onKeyDown?.(event, ...args);
    },
    [onEnter, onKeyDown, onStopTyping]
  );

  return {
    handleChange: handleChange as Required<T>["onChange"],
    handleKeyDown: handleKeyDown as Required<T>["onKeyDown"],
  };
}

export default useTextFieldEvents;
