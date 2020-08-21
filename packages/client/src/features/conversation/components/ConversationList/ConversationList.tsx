import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadConversationList,
  unloadConversationList,
} from "@purple-messenger/core";
import { Box } from "@material-ui/core";
import { getConversationList } from "features/conversation/selectors";
import ConversationRow from "../ConversationRow";

export interface ConversationListProps {
  className?: string;
  selectedUsername: string | undefined;
}

function ConversationList({
  className,
  selectedUsername,
}: ConversationListProps) {
  const dispatch = useDispatch();
  const conversations = useSelector(getConversationList);

  useEffect(() => {
    dispatch(loadConversationList());
    return () => {
      dispatch(unloadConversationList());
    };
  }, []);

  return (
    <Box className={className} p={1}>
      {conversations.map((conversation) => (
        <ConversationRow
          {...conversation}
          key={conversation.id}
          selected={selectedUsername === conversation.friend.username}
        />
      ))}
    </Box>
  );
}

export default memo(ConversationList);
