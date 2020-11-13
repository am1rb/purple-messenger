import { OrderedMap } from "immutable";
import {
  Conversation,
  conversationActionTypes,
  SetConversationListAction,
  messageActionTypes,
  StartTypingMessageAction,
  MessagePhase,
  StopTypingMessageAction,
  SendMessageAction,
  SentMessageAckAction,
  MessageStatus,
  ReceivedMessageAckAction,
  SeenMessageAckAction,
} from "@purple-messenger/core";

export interface ConversationState {
  list: OrderedMap<string, Conversation>;
}

const initialState: ConversationState = {
  list: OrderedMap(),
};

function conversationReducer(
  state: ConversationState = initialState,
  action:
    | SetConversationListAction
    | StartTypingMessageAction
    | StopTypingMessageAction
    | SendMessageAction
    | SentMessageAckAction
    | ReceivedMessageAckAction
    | SeenMessageAckAction
) {
  switch (action.type) {
    case conversationActionTypes.conversation.reducer.setConversationList:
      return {
        ...state,
        list: OrderedMap(
          action.list.map((item) => [item.friend.username, item])
        ),
      };
    case messageActionTypes.message.saga.startTypingMessage: {
      return action.phase === MessagePhase.Send
        ? state
        : {
            ...state,
            list: state.list.update(action.username, (conversation) => ({
              ...conversation,
              isTyping: true,
            })),
          };
    }
    case messageActionTypes.message.saga.stopTypingMessage: {
      return action.phase === MessagePhase.Send
        ? state
        : {
            ...state,
            list: state.list.update(action.username, (conversation) => ({
              ...conversation,
              isTyping: false,
            })),
          };
    }
    case messageActionTypes.message.saga.sendMessage: {
      return {
        ...state,
        list: state.list.update(action.username, (conversation) => ({
          ...conversation,
          message: {
            unreadCount: conversation.message?.unreadCount || 0,
            ...action.message,
          },
        })),
      };
    }
    case messageActionTypes.message.reducer.sentMessageAck: {
      return {
        ...state,
        list: state.list.update(action.receiverUsername, (conversation) =>
          conversation.message?.id === action.tempMessageId
            ? {
                ...conversation,
                message: {
                  ...conversation.message,
                  id: action.messageId,
                  status: MessageStatus.Sent,
                },
              }
            : conversation
        ),
      };
    }
    case messageActionTypes.message.reducer.receivedMessageAck: {
      return {
        ...state,
        list: state.list.update(action.username, (conversation) =>
          conversation.message?.id === action.messageId
            ? {
                ...conversation,
                message: {
                  ...conversation.message!,
                  status: MessageStatus.Received,
                },
              }
            : conversation
        ),
      };
    }
    case messageActionTypes.message.reducer.seenMessageAck: {
      return {
        ...state,
        list: state.list.update(action.username, (conversation) =>
          conversation.message?.id === action.messageId
            ? {
                ...conversation,
                message: {
                  ...conversation.message!,
                  status: MessageStatus.Seen,
                },
              }
            : conversation
        ),
      };
    }
    default:
      return state;
  }
}

export default conversationReducer;
