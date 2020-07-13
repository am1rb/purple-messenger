import { State } from "./reducers";

export const getConversationList = (state: State) => state.conversation.list;
