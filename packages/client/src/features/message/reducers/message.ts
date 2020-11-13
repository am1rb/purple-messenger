import {
  DecreaseLastMessageIdAction,
  messageActionTypes,
  Message,
  authActionTypes,
  MessageStatus,
  SentMessageAckAction,
  AddMessageAction,
  ReceivedMessageAckAction,
  SeenMessageAckAction,
  ClearMessageListAction,
  SingOutAction,
} from "@purple-messenger/core";
import { OrderedMap } from "immutable";

export interface MessageState {
  list: OrderedMap<number, Message>;
  lastMessageId: number;
}

export const initialState: MessageState = {
  list: OrderedMap([]),
  lastMessageId: -1,
};

function reducer(
  state = initialState,
  action:
    | DecreaseLastMessageIdAction
    | AddMessageAction
    | ReceivedMessageAckAction
    | SentMessageAckAction
    | AddMessageAction
    | ClearMessageListAction
    | ReceivedMessageAckAction
    | SeenMessageAckAction
    | SingOutAction
): MessageState {
  switch (action.type) {
    case messageActionTypes.message.reducer.decreaseLastMessageId:
      return {
        ...state,
        lastMessageId: state.lastMessageId - 1,
      };
    case messageActionTypes.message.reducer.sentMessageAck: {
      return {
        ...state,
        list: state.list.mapEntries(
          ([messageId, message]: [number, Message]) => [
            messageId === action.tempMessageId ? action.messageId : messageId,
            messageId === action.tempMessageId
              ? {
                  ...message,
                  id: action.messageId,
                  status: MessageStatus.Sent,
                }
              : message,
          ]
        ),
      };
    }
    case messageActionTypes.message.reducer.addMessage: {
      return {
        ...state,
        list: state.list.set(action.message.id, action.message),
      };
    }
    case messageActionTypes.message.reducer.clearMessageList:
      return {
        ...state,
        list: state.list.clear(),
      };
    case messageActionTypes.message.reducer.receivedMessageAck: {
      return {
        ...state,
        list: state.list.update(action.messageId, (message) => ({
          ...message,
          status: MessageStatus.Received,
        })),
      };
    }
    case messageActionTypes.message.reducer.seenMessageAck: {
      return {
        ...state,
        list: state.list.update(action.messageId, (message) => ({
          ...message,
          status: MessageStatus.Seen,
        })),
      };
    }
    case authActionTypes.auth.saga.signOut:
      return initialState;
    default:
      return state;
  }
}

export default reducer;
