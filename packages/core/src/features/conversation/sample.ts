import { AccountStatus } from "../profile/types";
import { Conversation } from "./types";

export const sampleConversation1: Conversation = {
  id: 1,
  isTyping: false,
  friend: {
    id: 1,
    bio: "759 Ujipa Parkway",
    email: "potpe@ubdop.ml",
    firstName: "Maurice",
    lastName: "Underwood",
    image: "",
    status: AccountStatus.Online,
    username: "potpe",
  },
};

export const sampleConversation2: Conversation = {
  id: 2,
  isTyping: true,
  friend: {
    id: 2,
    bio: "1573 Basog Square",
    email: "gizez@odudormar.do",
    firstName: "Alan",
    lastName: "Townsend",
    image: "",
    status: AccountStatus.Online,
    username: "alan",
  },
}

export const sampleConversationList: Conversation[] = [
  sampleConversation1,
  sampleConversation2,
];
