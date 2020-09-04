import React from "react";

interface CardActionAreaProps {
  children: React.ReactNode;
}

function CardActionArea({ children }: CardActionAreaProps) {
  return <div data-testid="mock-card-action-area">{children}</div>;
}

export default CardActionArea;
