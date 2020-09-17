import React from "react";

export interface LinkProps {
  to: string;
  children: React.ReactNode;
}

function Link({ to, children }: LinkProps) {
  return (
    <a data-testid="mock-link" data-to={to}>
      {children}
    </a>
  );
}

export default Link;
