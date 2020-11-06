import React from "react";
import type { RouteProps } from "react-router-dom";

function Route({ children, path, component }: RouteProps) {
  const pathArray = Array.isArray(path) ? path : [path];

  return (
    <div data-testid="mock-route" data-path={pathArray.join("_")}>
      {children}
    </div>
  );
}

export default Route;
