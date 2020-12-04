import React, { memo } from "react";
import PhoneIcon from "@material-ui/icons/Phone";
import IconButton from "@material-ui/core/IconButton";

function CallButton() {
  return (
    <IconButton size="small">
      <PhoneIcon />
    </IconButton>
  );
}

export default memo(CallButton);
