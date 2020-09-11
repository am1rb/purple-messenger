import React from "react";

export interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

function MuiButton({ onClick, children }: ButtonProps) {
  return (
    <button data-testid="mock-mui-button" onClick={onClick}>
      {children}
    </button>
  );
}

export default MuiButton;
