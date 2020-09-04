import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return <div data-testid="mock-layout">{children}</div>;
}

export default Layout;
