import { OrderedMap } from "immutable";
import {
  Conversation,
  conversationActionTypes,
  SetConversationListAction,
  messageActionTypes,
  StartTypingMessageAction,
  MessagePhase,
  StopTypingMessageAction,
  NewMessageAction,
  MessageOwner,
  SendMessageAction,
  SentMessageAckAction,
  MessageStatus,
  ReceivedMessageAckAction,
  SeenMessageAckAction,
} from "@purple-messenger/core";
import { Action } from "redux";

export interface ConversationState {
  list: OrderedMap<string, Conversation>;
}

const initialState: ConversationState = {
  list: OrderedMap(),
};

function conversationReducer(
  state: ConversationState = initialState,
  action: Action
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
    case messageActionTypes.message.saga.startTypingMessage: {
      const startTypingMessageAction = action as StartTypingMessageAction;
      return startTypingMessageAction.phase === MessagePhase.Send
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
    case messageActionTypes.message.saga.stopTypingMessage: {
      const stopTypingMessageAction = action as StopTypingMessageAction;
      return stopTypingMessageAction.phase === MessagePhase.Send
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
    case messageActionTypes.message.saga.newMessage: {
      const newMessageAction = action as NewMessageAction;
      return {
        ...state,
        list: state.list.update(
          newMessageAction.message.owner === MessageOwner.Me
            ? newMessageAction.receiverUsername
            : newMessageAction.senderUsername,
          (conversation) => ({
            ...conversation,
            message: {
              unreadCount: conversation.message?.unreadCount || 0,
              ...newMessageAction.message,
            },
          })
        ),
      };
    }
    case messageActionTypes.message.reducer.sendMessage: {
      const sendMessageAction = action as SendMessageAction;
      return {
        ...state,
        list: state.list.update(
          sendMessageAction.receiverUsername,
          (conversation) => ({
            ...conversation,
            message: {
              unreadCount: conversation.message?.unreadCount || 0,
              ...sendMessageAction.message,
            },
          })
        ),
      };
    }
    case messageActionTypes.message.reducer.sentMessageAck: {
      const sentMessageAck = action as SentMessageAckAction;
      return {
        ...state,
        list: state.list.update(
          sentMessageAck.receiverUsername,
          (conversation) =>
            conversation.message?.id === sentMessageAck.tempMessageId
              ? {
                  ...conversation,
                  message: {
                    ...conversation.message,
                    id: sentMessageAck.messageId,
                    status: MessageStatus.Sent,
                  },
                }
              : conversation
        ),
      };
    }
    case messageActionTypes.message.reducer.receivedMessageAck: {
      const receivedMessageAck = action as ReceivedMessageAckAction;
      return {
        ...state,
        list: state.list.update(receivedMessageAck.username, (conversation) =>
          conversation.message?.id === receivedMessageAck.messageId
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
      const seenMessageAck = action as SeenMessageAckAction;
      return {
        ...state,
        list: state.list.update(seenMessageAck.username, (conversation) =>
          conversation.message?.id === seenMessageAck.messageId
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
