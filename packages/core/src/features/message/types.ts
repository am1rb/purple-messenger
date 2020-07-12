export enum MessageOwner {
  Me = 0,
  Friend,
}

export enum MessageStatus {
  Pending = 0,
  Received,
  Sent,
}

export interface Message {
  id: number;
  body: string;
  status: MessageStatus;
  sentAt: Date;
  receivedAt?: Date;
  owner: MessageOwner;
}
