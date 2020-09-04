import React from "react";

export interface CardContentProps {
  children: React.ReactNode;
}

function MuiCardContent({ children }: CardContentProps) {
  return <div data-testid="mock-mui-card-content">{children}</div>;
}

export default MuiCardContent;
