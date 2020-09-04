import React from "react";

export interface CardProps {
  children: React.ReactNode;
}

function MuiCard({ children }: CardProps) {
  return <div data-testid="mock-mui-card">{children}</div>;
}

export default MuiCard;
