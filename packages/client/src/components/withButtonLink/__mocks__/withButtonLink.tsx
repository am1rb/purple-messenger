import React from "react";
import type { ButtonBaseProps } from "@material-ui/core";

function withButtonLink<T extends ButtonBaseProps>(C: React.ComponentType<T>) {
  return function ComponentWithLink(props: T) {
    return <C {...props} />;
  };
}

export default withButtonLink;
