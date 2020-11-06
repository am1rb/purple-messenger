import React from "react";
import type { RedirectProps } from "react-router-dom";

function Redirect({ to }: RedirectProps) {
  return <span data-testid="mock-redirect" data-to={to} />;
}

export default Redirect;
