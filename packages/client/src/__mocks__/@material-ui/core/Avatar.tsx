import React from "react";
import type { AvatarProps } from "@material-ui/core/Avatar";

function MuiAvatar({ src, alt }: AvatarProps) {
  return <img data-testid="mock-mui-avatar" src={src} alt={alt} />;
}

export default MuiAvatar;
