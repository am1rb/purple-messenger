import React from "react";
import type { CardProps } from "@material-ui/core/Card";

function MuiCard({ children }: CardProps) {
  return <div data-testid="mock-mui-card">{children}</div>;
}

export default MuiCard;
