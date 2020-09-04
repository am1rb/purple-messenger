import React from "react";

export interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

function MuiButton({ onClick, children }: ButtonProps) {
  return (
    <div data-testid="mock-mui-button" onClick={onClick}>
      {children}
    </div>
  );
}

export default MuiButton;
