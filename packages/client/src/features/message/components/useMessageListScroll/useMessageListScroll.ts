import { useRef, useMemo, useLayoutEffect } from "react";
import { Message } from "@purple-messenger/core";
import { mustScrollToTheEnd } from "features/message/helpers";

function useMessageListScroll(messages: Message[]) {
  const messageListRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const needScroll = useRef(true);

  needScroll.current = useMemo(() => {
    const scrollbar = messageListRef.current;
    return scrollbar ? mustScrollToTheEnd(scrollbar, messages) : false;
  }, [messages]);

  useLayoutEffect(() => {
    if (needScroll.current) {
      lastMessageRef.current?.scrollIntoView();
    }
  }, [messages]);

  return { messageListRef, lastMessageRef };
}

export default useMessageListScroll;
