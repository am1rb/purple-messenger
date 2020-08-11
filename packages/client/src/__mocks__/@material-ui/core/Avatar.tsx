import React from "react";

interface AvatarProps {
  src?: string;
}

const muiAvatar = jest.fn(({ src }: AvatarProps) => (
  <img data-testid="mui-avatar" src={src} />
));

export default muiAvatar;
