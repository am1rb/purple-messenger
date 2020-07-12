import { Message } from "../message/types";
import { FriendProfileInfo } from "../profile/types";

export interface LastMessage extends Message {
  unreadCount: number;
}

export interface Conversation {
  id: number;
  isTyping: boolean;
  message: LastMessage;
  friend: FriendProfileInfo;
}
