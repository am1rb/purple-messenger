import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Box } from "@material-ui/core";
import { getConversationList } from "features/conversation/selectors";
import ConversationRow from "../ConversationRow";
import useConversationInfo from "../useConversationInfo";

export interface ConversationListProps {
  className?: string;
}

function ConversationList({ className }: ConversationListProps) {
  const conversations = useSelector(getConversationList);
  const { username } = useConversationInfo();

  return (
    <Box className={className}>
      {conversations.map((conversation) => (
        <ConversationRow
          {...conversation}
          key={conversation.id}
          selected={username === conversation.friend.username}
        />
      ))}
    </Box>
  );
}

export default memo(ConversationList);
