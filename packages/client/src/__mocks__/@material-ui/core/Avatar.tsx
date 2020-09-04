import React from "react";

interface AvatarProps {
  src?: string;
}

function MuiAvatar({ src }: AvatarProps) {
  return <img data-testid="mock-mui-avatar" src={src} />;
}

export default MuiAvatar;
