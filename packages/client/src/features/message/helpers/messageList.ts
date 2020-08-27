import { Message } from "@purple-messenger/core";

export function mustScrollToTheEnd(
  scrollBar: HTMLDivElement,
  messages: Message[]
) {
  const messagesLen = messages.length;

  // return true if a new message sent by me on this device
  if (messagesLen > 0 && messages[messagesLen - 1].id < 0) {
    return true;
  }

  // return true if the scroll is at the end
  return scrollBar.offsetHeight + scrollBar.scrollTop >= scrollBar.scrollHeight;
}
