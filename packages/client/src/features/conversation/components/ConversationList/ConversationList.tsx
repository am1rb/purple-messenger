import React, { memo, useEffect } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  loadConversationList,
  unloadConversationList,
} from "@purple-messenger/core";
import { Box } from "@material-ui/core";
import { getConversationList } from "features/conversation/selectors";
import ConversationRow from "../ConversationRow";
import useConversation from "../useConversation";
import useStyles from "./styles";

interface Props {
  className: string;
  friendUsername: string|undefined;
}

function ConversationList({ className, friendUsername }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const conversations = useSelector(getConversationList);

  useEffect(() => {
    dispatch(loadConversationList());
    return () => {
      dispatch(unloadConversationList());
    };
  }, []);

  return (
    <Box className={clsx(classes.root, className)} p={1}>
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
