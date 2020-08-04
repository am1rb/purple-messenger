import React from "react";

export interface TypographyProps {
  children: React.ReactNode;
}

const muiTypography = jest.fn(({ children }: TypographyProps) => (
  <div data-testid="mui-typography">{children}</div>
));

export default muiTypography;
