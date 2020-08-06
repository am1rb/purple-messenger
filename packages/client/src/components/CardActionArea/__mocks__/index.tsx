import React from "react";

interface CardActionAreaProps {
  children: React.ReactNode;
}

const cardActionArea = jest.fn(({ children }: CardActionAreaProps) => (
  <div data-testid="card-action-area">{children}</div>
));

export default cardActionArea;
