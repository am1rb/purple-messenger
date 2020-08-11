import React from "react";

export interface CardContentProps {
  children: React.ReactNode;
}

const muiCardContent = jest.fn(({ children }: CardContentProps) => (
  <div data-testid="mui-card-content">{children}</div>
));

export default muiCardContent;
