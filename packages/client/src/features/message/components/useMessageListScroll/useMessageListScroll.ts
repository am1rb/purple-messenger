import { useRef, useMemo, useLayoutEffect } from "react";
import { Message } from "@purple-messenger/core";
import { mustScrollToTheEnd } from "features/message/helpers";

function useMessageListScroll(messages: Message[]) {
  const messageListRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const needScroll = useRef(true);

  needScroll.current = useMemo(() => {
    const scrollBar = messageListRef.current;
    return scrollBar ? mustScrollToTheEnd(scrollBar, messages) : false;
  }, [messages]);

  useLayoutEffect(() => {
    if (needScroll.current) {
      lastMessageRef.current?.scrollIntoView();
    }
  }, [messages]);

  return { messageListRef, lastMessageRef };
}

export default useMessageListScroll;
