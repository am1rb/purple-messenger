import { Message } from "@purple-messenger/core";

export function isMessageHasTemporaryId(message: Message) {
  return message.id < 0;
}

export function isScrollAtTheEnd(scrollBar: HTMLDivElement) {
  return scrollBar.offsetHeight + scrollBar.scrollTop >= scrollBar.scrollHeight;
}

export function mustScrollToTheEnd(
  scrollBar: HTMLDivElement,
  messages: Message[]
) {
  const messagesLen = messages.length;

  // return true if a new message sent by me on this device
  if (messagesLen > 0 && isMessageHasTemporaryId(messages[messagesLen - 1])) {
    return true;
  }

  // return true if the scroll is at the end
  return isScrollAtTheEnd(scrollBar);
}
