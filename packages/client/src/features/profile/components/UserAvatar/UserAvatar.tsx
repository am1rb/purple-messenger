import React, { memo } from "react";
import clsx from "clsx";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getProfileInfo } from "features/profile/selectors";
import useStyles from "./styles";

interface Props {
  className?: string;
}

function UserAvatar({ className }: Props) {
  const classes = useStyles();
  const profileInfo = useSelector(getProfileInfo);

  return (
    <Avatar
      className={clsx(classes.root, className)}
      src={profileInfo ? profileInfo.image : undefined}
    />
  );
}

export default memo(UserAvatar);
