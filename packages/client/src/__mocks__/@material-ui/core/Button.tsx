import React from "react";

export interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const muiButton = jest.fn(({ onClick, children }: ButtonProps) => (
  <div data-testid="mui-button" onClick={onClick}>
    {children}
  </div>
));

export default muiButton;
