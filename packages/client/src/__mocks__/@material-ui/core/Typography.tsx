import React from "react";
import type { TypographyProps } from "@material-ui/core/Typography";

function MuiTypography({ children }: TypographyProps) {
  return <div data-testid="mock-mui-typography">{children}</div>;
}

export default MuiTypography;
