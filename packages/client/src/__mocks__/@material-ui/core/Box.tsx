import React from "react";
import type { BoxProps } from "@material-ui/core/Box";

function MuiBox({ children }: BoxProps) {
  return <div data-testid="mock-mui-box">{children}</div>;
}

export default MuiBox;
