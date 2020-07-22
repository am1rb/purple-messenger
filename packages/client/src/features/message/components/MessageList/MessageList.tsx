import React, { memo, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMessageList } from "features/message/selectors";
import MessageRow from "../MessageRow";
import useConversation from "features/conversation/components/useConversation";
import { clearMessageList } from "@purple-messenger/core";
import useStyles from './styles';

function MessageList() {
  const messages = useSelector(getMessageList);
  const {username} = useConversation();
  const dispatch = useDispatch();
  const messageListRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const classes = useStyles();

  useEffect(() => {
    dispatch(clearMessageList());
  }, [username]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  return (
    <div className={classes.root} ref={messageListRef}>
      {messages.map(message => (
        <MessageRow key={message.id} {...message} />
      ))}
      <div ref={lastMessageRef} />
    </div>
  );
}

export default memo(MessageList);
