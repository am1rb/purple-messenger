import React from "react";
import RedirectToRoot from "../RedirectToRoot";
import withAuthBase from "../withAuthBase";

function withGuestPage(C: React.ComponentType) {
  return withAuthBase(RedirectToRoot, C);
}

export default withGuestPage;
