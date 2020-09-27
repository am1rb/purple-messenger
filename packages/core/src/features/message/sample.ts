import { Message, MessageOwner, MessageStatus } from "./types";

export const sampleMessage1: Message = {
  id: 1,
  body: "496 Veic Lane 1662 Ezeler Manor",
  owner: MessageOwner.Friend,
  sentAt: new Date(),
  status: MessageStatus.Pending,
}

export const sampleMessage2: Message = {
  id: 2,
  body: "496 Veic Lane 1662 Ezeler Manor",
  owner: MessageOwner.Me,
  sentAt: new Date(),
  status: MessageStatus.Received,
}

export const sampleMessage3: Message = {
  id: 3,
  body: "496 Veic Lane 1662 Ezeler Manor",
  owner: MessageOwner.Me,
  sentAt: new Date(),
  status: MessageStatus.Sent,
}

export const sampleMessageList: Message[] = [
  sampleMessage1,
  sampleMessage2,
  sampleMessage3,
];