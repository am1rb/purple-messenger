import React from "react";

export interface BoxProps {
  children: React.ReactNode;
}

function MuiBox({ children }: BoxProps) {
  return <div data-testid="mock-mui-box">{children}</div>;
}

export default MuiBox;
