import actionTypes from "./actionTypes";
import { Conversation } from "./types";

export const loadConversationList = () => ({
  type: actionTypes.conversation.saga.loadConversationList,
});
export type LoadConversationListAction = ReturnType<
  typeof loadConversationList
>;

export const unloadConversationList = () => ({
  type: actionTypes.conversation.saga.unloadConversationList,
});
export type unloadConversationListAction = ReturnType<
  typeof unloadConversationList
>;

export const setConversationList = (list: Conversation[]) => ({
  type: actionTypes.conversation.reducer.setConversationList,
  list,
});
export type SetConversationListAction = ReturnType<typeof setConversationList>;
