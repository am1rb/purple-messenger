import React from "react";
import type { IconButtonProps } from "@material-ui/core/IconButton";

function MuiIconButton(
  { type, disabled, onClick, children }: IconButtonProps,
  ref: React.Ref<HTMLButtonElement>
) {
  return (
    <button
      data-testid="mock-mui-icon-button"
      type={type}
      disabled={disabled}
      onClick={onClick}
      ref={ref}
    >
      {children}
    </button>
  );
}

export default React.forwardRef(MuiIconButton);
