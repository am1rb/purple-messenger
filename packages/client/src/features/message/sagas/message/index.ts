import {select, put} from 'redux-saga/effects'
import { SubmitMessageAction, decreaseLastMessageId, sendMessage } from "@purple-messenger/core";
import { getLastMessageId } from 'features/message/selectors';

export function* submitMessage({receiverUsername, message}: SubmitMessageAction) {
  const messageId = yield select(getLastMessageId)
  yield put(decreaseLastMessageId())

  yield put(sendMessage(receiverUsername, {
    id: messageId,
    body: message,
  }))
}