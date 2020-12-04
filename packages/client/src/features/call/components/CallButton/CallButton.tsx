import React, { memo } from "react";
import PhoneIcon from "@material-ui/icons/Phone";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";

type CallButtonProps = Pick<IconButtonProps, "disabled">;

function CallButton(props: CallButtonProps) {
  return (
    <IconButton size="small" {...props}>
      <PhoneIcon />
    </IconButton>
  );
}

export default memo(CallButton);
