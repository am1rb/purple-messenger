import React, { memo, useCallback } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, Box } from "@material-ui/core";
import { signOut } from "@purple-messenger/core";
import UserAvatar from "features/profile/components/UserAvatar";
import { getProfileInfo } from "features/profile/selectors";
import useStyles from "./AppMenu.styles";

export interface AppMenuProps {
  className?: string;
}

function AppMenu({ className }: AppMenuProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const profile = useSelector(getProfileInfo);

  const handleSignOut = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  return (
    <div className={clsx(classes.root, className)}>
      <UserAvatar />
      <Box textAlign="center" mt={2}>
        <Typography className={classes.firstName} color="inherit" gutterBottom>
          Hi, {profile?.firstName}
        </Typography>
        <Button
          color="secondary"
          onClick={handleSignOut}
          variant="outlined"
          size="small"
        >
          signOut
        </Button>
      </Box>
    </div>
  );
}

export default memo(AppMenu);
