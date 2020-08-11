import React from "react";

export interface BoxProps {
  children: React.ReactNode;
}

const muiBox = jest.fn(({ children }: BoxProps) => (
  <div data-testid="mui-box">{children}</div>
));

export default muiBox;
