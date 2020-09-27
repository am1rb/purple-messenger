import React from "react";

export interface RedirectProps {
  to: string;
}

export function Redirect({ to }: RedirectProps) {
  return <span data-testid="mock-redirect" data-to={to} />;
}

export default Redirect;
