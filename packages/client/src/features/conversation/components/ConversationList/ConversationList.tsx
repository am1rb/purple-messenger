import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadConversationList,
  unloadConversationList,
} from "@purple-messenger/core";
import { Box } from "@material-ui/core";
import { getConversationList } from "features/conversation/selectors";
import ConversationRow from "../ConversationRow";

interface Props {
  className: string;
  friendUsername: string | undefined;
}

function ConversationList({ className, friendUsername }: Props) {
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
      {conversations.toArray().map(([, conversation]) => (
        <ConversationRow
          {...conversation}
          key={conversation.id}
          selected={friendUsername === conversation.friend.username}
        />
      ))}
    </Box>
  );
}

export default memo(ConversationList);
