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
  action:
    | DecreaseLastMessageIdAction
    | AddMessageAction
    | ReceivedMessageAckAction
): MessageState {
  switch (action.type) {
    case messageActionTypes.message.reducer.decreaseLastMessageId:
      return {
        ...state,
        lastMessageId: state.lastMessageId - 1,
      };
    case messageActionTypes.message.reducer.sentMessageAck: {
      const sentMessageAckAction = action as SentMessageAckAction;
      return {
        ...state,
        list: state.list.mapEntries(
          ([messageId, message]: [number, Message]) => [
            messageId === sentMessageAckAction.tempMessageId
              ? sentMessageAckAction.messageId
              : messageId,
            messageId === sentMessageAckAction.tempMessageId
              ? {
                  ...message,
                  id: sentMessageAckAction.messageId,
                  status: MessageStatus.Sent,
                }
              : message,
          ]
        ),
      };
    }
    case messageActionTypes.message.reducer.addMessage: {
      const addMessageAction = action as AddMessageAction;
      return {
        ...state,
        list: state.list.set(
          addMessageAction.message.id,
          addMessageAction.message
        ),
      };
    }
    case messageActionTypes.message.reducer.clearMessageList:
      return {
        ...state,
        list: state.list.clear(),
      };
    case messageActionTypes.message.reducer.receivedMessageAck: {
      const receivedMessageAckAction = action as ReceivedMessageAckAction;
      return {
        ...state,
        list: state.list.update(
          receivedMessageAckAction.messageId,
          (message) => ({
            ...message,
            status: MessageStatus.Received,
          })
        ),
      };
    }
    case messageActionTypes.message.reducer.seenMessageAck: {
      const receivedMessageAckAction = action as SeenMessageAckAction;
      return {
        ...state,
        list: state.list.update(
          receivedMessageAckAction.messageId,
          (message) => ({
            ...message,
            status: MessageStatus.Seen,
          })
        ),
      };
    }
    case authActionTypes.auth.saga.signOut:
      return initialState;
    default:
      return state;
  }
}

export default reducer;
