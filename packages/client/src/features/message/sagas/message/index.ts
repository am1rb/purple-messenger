import { select, put, call } from "redux-saga/effects";
import {
  SubmitMessageAction,
  decreaseLastMessageId,
  sendMessage,
  StartTypingMessageAction,
  StopTypingMessageAction,
  MessagePhase,
  MessageStatus,
  MessageOwner,
  NewMessageAction,
  receivedMessageAck,
  addMessage,
} from "@purple-messenger/core";
import { getLastMessageId } from "features/message/selectors";
import { send } from "features/socket/effects";
import { getCurrentConversationUsername } from "features/conversation/selectors";

export function* submitMessage({
  receiverUsername,
  message,
}: SubmitMessageAction) {
  const messageId = yield select(getLastMessageId);
  yield put(decreaseLastMessageId());

  yield put(
    sendMessage(receiverUsername, {
      id: messageId,
      body: message,
      status: MessageStatus.Pending,
      owner: MessageOwner.Me,
      sentAt: new Date(),
    })
  );
}

export function* startTypingMessage(action: StartTypingMessageAction) {
  if(action.phase===MessagePhase.Send) {
    yield call(send, action);
  }
}

export function* stopTypingMessage(action: StopTypingMessageAction) {
  if(action.phase===MessagePhase.Send) {
    yield call(send, action);
  }
}

export function* newMessage({senderUsername, message}: NewMessageAction) {
  const selectedConversation: string|undefined = yield select(getCurrentConversationUsername);

  if(selectedConversation!==senderUsername) {
    return;
  }

  // append to the list if the list is selected
  yield put(addMessage(message))

  // send the ack to the sender
  yield call(send, receivedMessageAck(senderUsername, message.id));
}