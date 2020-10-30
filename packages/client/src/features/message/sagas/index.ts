import { takeEvery } from "redux-saga/effects";
import { messageActionTypes } from "@purple-messenger/core";
import * as messageSagas from "./message";

const sagas = [
  takeEvery(
    messageActionTypes.message.saga.submitMessage,
    messageSagas.submitMessage
  ),
  takeEvery(
    messageActionTypes.message.saga.startTypingMessage,
    messageSagas.sendIfMessagePhaseIsSend
  ),
  takeEvery(
    messageActionTypes.message.saga.stopTypingMessage,
    messageSagas.sendIfMessagePhaseIsSend
  ),
  takeEvery(
    messageActionTypes.message.reducer.seenMessageAck,
    messageSagas.sendIfMessagePhaseIsSend
  ),
  takeEvery(
    messageActionTypes.message.saga.sendMessage,
    messageSagas.sendIfMessagePhaseIsSend
  ),
  takeEvery(
    messageActionTypes.message.saga.sendMessage,
    messageSagas.newMessage
  ),
];

export default sagas;
