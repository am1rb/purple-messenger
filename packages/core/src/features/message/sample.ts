import { Owner } from "@purple-messenger/core/core/type";
import { Message, MessageStatus } from "./types";

export const sampleMessage1: Message = {
  id: -1,
  body: "496 Veic Lane 1662 Ezeler Manor",
  owner: Owner.Friend,
  sentAt: new Date(),
  status: MessageStatus.Pending,
};

export const sampleMessage2: Message = {
  id: 2,
  body: "496 Veic Lane 1662 Ezeler Manor",
  owner: Owner.Me,
  sentAt: new Date(),
  status: MessageStatus.Received,
};

export const sampleMessage3: Message = {
  id: 3,
  body: "496 Veic Lane 1662 Ezeler Manor",
  owner: Owner.Me,
  sentAt: new Date(),
  status: MessageStatus.Sent,
};

export const sampleMessage4: Message = {
  id: 4,
  body: "1109 Bofup Extension 992 Iviaha Pass",
  owner: Owner.Me,
  sentAt: new Date(),
  status: MessageStatus.Received,
};

export const sampleMessageList: Message[] = [
  sampleMessage1,
  sampleMessage2,
  sampleMessage3,
];
