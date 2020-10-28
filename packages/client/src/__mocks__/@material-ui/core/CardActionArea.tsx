import React from "react";
import type { CardActionAreaProps } from "@material-ui/core/CardActionArea";

function MuiCardActionArea({ children }: CardActionAreaProps) {
  return <div data-testid="mock-mui-card-action-area">{children}</div>;
}

export default MuiCardActionArea;
