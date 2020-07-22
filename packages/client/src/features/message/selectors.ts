import { State } from "features/message/reducers";
import { createSelector } from 'reselect'

export const getLastMessageId = (state: State) => state.message.lastMessageId;

export const getMessageListMap = (state: State) => state.message.list;

export const getMessageList = createSelector(
  getMessageListMap,
  (list) => list.toArray().map(([id, message]) => message),
);