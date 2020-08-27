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
import { mustScrollToTheEnd } from "../../helpers";
import useStyles from "./MessageList.styles";

function MessageList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const messages = useSelector(getMessageList);
  const { username } = useConversationInfo();
  const messageListRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const needScroll = useRef(true);

  useEffect(() => {
    dispatch(clearMessageList());
  }, [username]);

  needScroll.current = useMemo(() => {
    const scrollbar = messageListRef.current;
    return scrollbar ? mustScrollToTheEnd(scrollbar, messages) : false;
  }, [messages]);

  useLayoutEffect(() => {
    if (needScroll.current) {
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
