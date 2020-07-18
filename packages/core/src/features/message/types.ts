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
  status: MessageStatus;
  sentAt: Date;
  owner: MessageOwner;
}

export interface Message extends NewMessage {
  receivedAt?: Date;
}

export enum TypingMessagePhase {
  Send = 0,
  Receive,
}
