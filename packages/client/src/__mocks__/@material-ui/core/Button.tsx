import React from "react";
import type { ButtonProps } from "@material-ui/core/Button";

function MuiButton({ onClick, children }: ButtonProps) {
  return (
    <button data-testid="mock-mui-button" onClick={onClick}>
      {children}
    </button>
  );
}

export default MuiButton;
