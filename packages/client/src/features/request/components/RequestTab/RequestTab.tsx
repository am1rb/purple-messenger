import React from "react";
import Tab, { TabProps } from "@material-ui/core/Tab";
import Badge from "@material-ui/core/Badge";

export type RequestTabProps = Pick<TabProps, "value" | "className" | "label">;

function RequestTab({ label, ...other }: RequestTabProps) {
  const hasPendingRequest = true;
  return (
    <Tab
      label={
        <Badge
          badgeContent={hasPendingRequest ? "1" : "0"}
          color="error"
          variant="dot"
        >
          {label}
        </Badge>
      }
      {...other}
    />
  );
}

export default RequestTab;
