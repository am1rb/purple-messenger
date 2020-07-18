import { OrderedMap } from "immutable";
import {
  Conversation,
  conversationActionTypes,
  SetConversationListAction,
  messageActionTypes,
  StartTypingMessageAction,
  TypingMessagePhase,
  StopTypingMessageAction,
} from "@purple-messenger/core";

export interface ConversationState {
  list: OrderedMap<string, Conversation>;
}

const initialState: ConversationState = {
  list: OrderedMap(),
};

function reducer(
  state: ConversationState = initialState,
  action:
    | SetConversationListAction
    | StartTypingMessageAction
    | StopTypingMessageAction
) {
  switch (action.type) {
    case conversationActionTypes.conversation.reducer.setConversationList:
      return {
        ...state,
        list: OrderedMap(
          (action as SetConversationListAction).list.map((item) => [
            item.friend.username,
            item,
          ])
        ),
      };
    case messageActionTypes.message.reducer.startTypingMessage: {
      const startTypingMessageAction = action as StartTypingMessageAction;
      return startTypingMessageAction.phase === TypingMessagePhase.Send
        ? state
        : {
            ...state,
            list: state.list.update(
              startTypingMessageAction.username,
              (conversation) => ({
                ...conversation,
                isTyping: true,
              })
            ),
          };
    }
    case messageActionTypes.message.reducer.stopTypingMessage: {
      const stopTypingMessageAction = action as StopTypingMessageAction;
      return stopTypingMessageAction.phase === TypingMessagePhase.Send
        ? state
        : {
            ...state,
            list: state.list.update(
              stopTypingMessageAction.username,
              (conversation) => ({
                ...conversation,
                isTyping: false,
              })
            ),
          };
    }
    default:
      return state;
  }
}

export default reducer;
