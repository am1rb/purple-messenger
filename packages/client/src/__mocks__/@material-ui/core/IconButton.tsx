import React from "react";

export interface IconButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

function MuiIconButton(
  { onClick, children }: IconButtonProps,
  ref: React.Ref<HTMLButtonElement>
) {
  return (
    <button data-testid="mock-mui-icon-button" onClick={onClick} ref={ref}>
      {children}
    </button>
  );
}

export default React.forwardRef(MuiIconButton);
