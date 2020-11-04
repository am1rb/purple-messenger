import React from "react";
import type { CardContentProps } from "@material-ui/core/CardContent";

function MuiCardContent({ children }: CardContentProps) {
  return <div data-testid="mock-mui-card-content">{children}</div>;
}

export default MuiCardContent;
