import React, {
  memo,
  useEffect,
  useRef,
  useMemo,
  useLayoutEffect,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMessageList } from "features/message/selectors";
import MessageRow from "../MessageRow";
import useConversationInfo from "features/conversation/components/useConversationInfo";
import { clearMessageList } from "@purple-messenger/core";
import useStyles from "./MessageList.styles";

function MessageList() {
  const messages = useSelector(getMessageList);
  const { username } = useConversationInfo();
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

    if (!scrollbar) {
      return false;
    }

    const messagesLen = messages.length;
    if (messagesLen > 0 && messages[messagesLen - 1].id < 0) {
      return true;
    }

    return (
      scrollbar.offsetHeight + scrollbar.scrollTop >= scrollbar.scrollHeight
    );
  }, [messages]);

  useLayoutEffect(() => {
    if (isAtEndOfScroll.current) {
      lastMessageRef.current?.scrollIntoView();
    }
  }, [messages]);

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
