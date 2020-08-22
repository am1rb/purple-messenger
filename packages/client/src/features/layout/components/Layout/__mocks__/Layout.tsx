import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const layout = jest.fn(({ children }: LayoutProps) => (
  <div data-testid="layout">{children}</div>
));

export default layout;
