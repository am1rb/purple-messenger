import React from "react";

export interface TypographyProps {
  children: React.ReactNode;
}

function MuiTypography({ children }: TypographyProps) {
  return <div data-testid="mock-mui-typography">{children}</div>;
}

export default MuiTypography;
