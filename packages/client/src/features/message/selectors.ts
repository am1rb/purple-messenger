import { State } from "features/message/reducers";

export const getLastMessageId = (state: State) => state.message.lastMessageId;

export const getMessageList = (state: State) => state.message.list;
