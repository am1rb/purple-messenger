import {
  DecreaseLastMessageIdAction,
  messageActionTypes,
  Message,
  authActionTypes,
  SendMessageAction,
  MessageStatus,
  SentMessageAckAction,
} from "@purple-messenger/core";
import { OrderedMap } from "immutable";

export interface MessageState {
  list: OrderedMap<number, Message>;
  lastMessageId: number;
}

const initialState: MessageState = {
  list: OrderedMap([]),
  lastMessageId: -1,
};

function reducer(
  state = initialState,
  action: DecreaseLastMessageIdAction
): MessageState {
  switch (action.type) {
    case messageActionTypes.message.reducer.decreaseLastMessageId:
      return {
        ...state,
        lastMessageId: state.lastMessageId - 1,
      };
    case messageActionTypes.message.reducer.sendMessage: {
      const sendMessageAction = action as SendMessageAction;
      return {
        ...state,
        list: state.list.set(sendMessageAction.message.id, sendMessageAction.message),
      };
    }
    case messageActionTypes.message.reducer.sentMessageAck: {
      const sentMessageAck = action as SentMessageAckAction;
      return {
        ...state,
        list: state.list.mapEntries(([messageId, message]: [number, Message]) => [
          messageId===sentMessageAck.tempMessageId ? sentMessageAck.messageId : messageId,
          messageId===sentMessageAck.tempMessageId ? {
            ...message,
            id: sentMessageAck.messageId,
            status: MessageStatus.Sent,
          } : message,
        ])
      };
    }
    case authActionTypes.auth.saga.signOut:
      return initialState;
    default:
      return state;
  }
}

export default reducer;
