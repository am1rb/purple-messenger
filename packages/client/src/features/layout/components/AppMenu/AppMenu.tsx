import React, { memo, useCallback } from "react";
import clsx from "clsx";
import UserAvatar from "features/profile/components/UserAvatar/UserAvatar";
import useStyles from "./styles";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { signOut } from "@purple-messenger/core";

interface Props {
  className: string;
}

function AppMenu({ className }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSignOut = useCallback(() => {
    dispatch(signOut());
  }, [ dispatch ]);

  return (
    <div className={clsx(classes.root, className)}>
      <UserAvatar />
      <Button color="secondary" onClick={handleSignOut}>signOut</Button>
    </div>
  );
}

export default memo(AppMenu);
