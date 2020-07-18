export enum MessageOwner {
  Me = 0,
  Friend,
}

export enum MessageStatus {
  Pending = 0,
  Sent,
  Received,
  Seen,
}

export interface NewMessage {
  id: number;
  body: string;
}

export interface Message extends NewMessage {
  status: MessageStatus;
  sentAt: Date;
  receivedAt?: Date;
  owner: MessageOwner;
}

export enum TypingMessagePhase {
  Send = 0,
  Receive,
}
