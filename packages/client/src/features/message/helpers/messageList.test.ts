import {
  mustScrollToTheEnd,
  isMessageHasTemporaryId,
  isScrollAtTheEnd,
} from "./messageList";
import { Message, Owner, MessageStatus } from "@purple-messenger/core";

const sharedMessage: Message = {
  id: -1,
  body: "1183 Veptat Grove",
  owner: Owner.Me,
  sentAt: new Date(),
  status: MessageStatus.Pending,
};

const sharedMessages: Message[] = [sharedMessage];

const sharedScrollBar: Partial<HTMLDivElement> = {
  offsetHeight: 600,
  scrollTop: 400,
  scrollHeight: 1000,
};

describe("The messageList tests", () => {
  it("Should return true if the message has temporary id", () => {
    expect(isMessageHasTemporaryId({ ...sharedMessage, id: -1 })).toBeTruthy();
  });

  it("Should return false if the message has not temporary id", () => {
    expect(isMessageHasTemporaryId({ ...sharedMessage, id: 1 })).toBeFalsy();
  });

  it("Should render true if the scroll position is at the end", () => {
    expect(isScrollAtTheEnd(sharedScrollBar as HTMLDivElement)).toBeTruthy();
  });

  it("Should render false if the scroll position is at the end", () => {
    expect(
      isScrollAtTheEnd({ ...sharedScrollBar, scrollTop: 0 } as HTMLDivElement)
    ).toBeFalsy();
  });

  it("Should return true if the last message is sent by current user", () => {
    const scrollBar: Partial<HTMLDivElement> = {};
    expect(
      mustScrollToTheEnd(scrollBar as HTMLDivElement, sharedMessages)
    ).toBeTruthy();
  });

  it("Should return true if the scrollBar is at the end", () => {
    expect(
      mustScrollToTheEnd(sharedScrollBar as HTMLDivElement, sharedMessages)
    ).toBeTruthy();
  });
});
