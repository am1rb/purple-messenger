import React from "react";

export interface IconButtonProps
  extends Pick<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "type" | "disabled"
  > {
  onClick?: () => void;
  children: React.ReactNode;
}

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
