import React, { memo, useEffect, useRef, useMemo, useLayoutEffect } from "react";
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
  const isAtEndOfScroll = useRef(true);

  useEffect(() => {
    dispatch(clearMessageList());
  }, [username]);

  isAtEndOfScroll.current = useMemo(() => {
    const scrollbar = messageListRef.current;

    if(!scrollbar) {
      return false;
    }

    if(messages[messages.length-1].id<0) {
      return true;
    }

    return scrollbar.offsetHeight + scrollbar.scrollTop >= scrollbar.scrollHeight
  }, [messages]);


  useLayoutEffect(() => {
    if(isAtEndOfScroll.current) {
      lastMessageRef.current?.scrollIntoView();
    }
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
