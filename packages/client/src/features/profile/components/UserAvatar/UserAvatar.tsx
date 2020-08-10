import React, { memo } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import Avatar from "@material-ui/core/Avatar";
import { getProfileInfoImage } from "features/profile/selectors";
import useStyles from "./UserAvatar.styles";

interface Props {
  className?: string;
}

function UserAvatar({ className }: Props) {
  const classes = useStyles();
  const profileInfoImage = useSelector(getProfileInfoImage);

  return (
    <Avatar className={clsx(classes.root, className)} src={profileInfoImage} />
  );
}

export default memo(UserAvatar);
