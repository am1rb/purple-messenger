import { select, put, call } from "redux-saga/effects";
import {
  SubmitMessageAction,
  decreaseLastMessageId,
  sendMessage,
  StartTypingMessageAction,
  StopTypingMessageAction,
  TypingMessagePhase,
  MessageStatus,
  MessageOwner,
} from "@purple-messenger/core";
import { getLastMessageId } from "features/message/selectors";
import { send } from "features/socket/effects";

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
  if(action.phase===TypingMessagePhase.Send) {
    yield call(send, action);
  }
}

export function* stopTypingMessage(action: StopTypingMessageAction) {
  if(action.phase===TypingMessagePhase.Send) {
    yield call(send, action);
  }
}
