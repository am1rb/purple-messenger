import React from "react";
import type { SwitchProps } from "react-router-dom";

function Switch({ children }: SwitchProps) {
  return <div data-testid="mock-switch">{children}</div>;
}

export default Switch;
