import { Owner } from "@purple-messenger/core/core/type";

export enum MessageStatus {
  Pending = 0,
  Sent,
  Received,
  Seen,
}

export interface NewMessage {
  id: number;
  body: string;
  status: MessageStatus;
  sentAt: Date;
  owner: Owner;
}

export interface Message extends NewMessage {
  receivedAt?: Date;
}
