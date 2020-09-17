import React from "react";
import { ButtonBaseProps } from "@material-ui/core";
import { Link, LinkProps } from "react-router-dom";

function withButtonLink<T extends ButtonBaseProps>(C: React.ComponentType<T>) {
  return function ComponentWithLink({
    to,
    ...other
  }: T & Partial<Pick<LinkProps, "to">>) {
    const otherProps = to
      ? {
          component: Link,
          to,
        }
      : {};
    return <C {...(other as T)} {...otherProps} />;
  };
}

export default withButtonLink;
