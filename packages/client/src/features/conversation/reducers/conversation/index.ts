import { OrderedMap } from "immutable";
import {
  Conversation,
  conversationActionTypes,
  SetConversationListAction,
} from "@purple-messenger/core";

export interface ConversationState {
  list: OrderedMap<string, Conversation>;
}

const initialState: ConversationState = {
  list: OrderedMap(),
};

function reducer(
  state: ConversationState = initialState,
  action: SetConversationListAction
) {
  switch (action.type) {
    case conversationActionTypes.conversation.reducer.setConversationList:
      return {
        ...state,
        list: OrderedMap(action.list.map(item => [item.friend.username, item])),
      };
    default:
      return state;
  }
}

export default reducer;
