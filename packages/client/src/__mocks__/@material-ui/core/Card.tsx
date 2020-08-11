import React from "react";

export interface CardProps {
  children: React.ReactNode;
}

const muiCard = jest.fn(({ children }: CardProps) => (
  <div data-testid="mui-card">{children}</div>
));

export default muiCard;
