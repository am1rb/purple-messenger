import React from "react";
import { useSelector } from "react-redux";
import Tab, { TabProps } from "@material-ui/core/Tab";
import Badge from "@material-ui/core/Badge";
import { getHasUndeadMessage } from "features/conversation/selectors";

export type ConversationTabProps = Pick<
  TabProps,
  "value" | "className" | "label"
>;

function ConversationTab({ label, ...other }: ConversationTabProps) {
  const hasUnreadMessage = useSelector(getHasUndeadMessage);
  console.log("hasUnreadMessage", hasUnreadMessage);
  return (
    <Tab
      label={
        <Badge
          badgeContent={hasUnreadMessage ? 1 : 0}
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
