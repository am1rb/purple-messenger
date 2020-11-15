import React from "react";
import Tab, { TabProps } from "@material-ui/core/Tab";
import Badge from "@material-ui/core/Badge";

export type ConversationTabProps = Pick<
  TabProps,
  "value" | "className" | "label"
>;

function ConversationTab({ label, ...other }: ConversationTabProps) {
  const hasUnreadMessage = true;
  return (
    <Tab
      label={
        <Badge
          badgeContent={hasUnreadMessage ? "1" : "0"}
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

export default ConversationTab;
