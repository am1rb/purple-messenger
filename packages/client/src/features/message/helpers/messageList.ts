import { Message } from "@purple-messenger/core";

export function mustScrollToTheEnd(
  scrollBar: HTMLDivElement,
  messages: Message[]
) {
  const messagesLen = messages.length;

  if (messagesLen > 0 && messages[messagesLen - 1].id < 0) {
    return true;
  }

  return scrollBar.offsetHeight + scrollBar.scrollTop >= scrollBar.scrollHeight;
}
