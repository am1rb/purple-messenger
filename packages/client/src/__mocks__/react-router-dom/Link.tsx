import React from "react";
import type { LinkProps } from "react-router-dom";

function Link({ to, children, href }: LinkProps) {
  return (
    <a data-testid="mock-link" data-to={to} href={href}>
      {children}
    </a>
  );
}

export default Link;
