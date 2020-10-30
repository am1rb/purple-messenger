import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearMessageList } from "@purple-messenger/core";
import { getMessageList } from "features/message/selectors";
import useMessageListScroll from "../useMessageListScroll";
import MessageRow from "../MessageRow";
import useStyles from "./MessageList.styles";

export interface MessageListProps {
  username: string | undefined;
}

function MessageList({ username }: MessageListProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const messages = useSelector(getMessageList);
  const { messageListRef, lastMessageRef } = useMessageListScroll(messages);

  useEffect(() => {
    dispatch(clearMessageList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <div className={classes.root} ref={messageListRef}>
      {messages.map((message) => (
        <MessageRow key={message.id} {...message} />
      ))}
      <div ref={lastMessageRef} />
    </div>
  );
}

export default memo(MessageList);
