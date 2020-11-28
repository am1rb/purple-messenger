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
    messageSagas.sendIfPhaseIsSend
  ),
  takeEvery(
    messageActionTypes.message.saga.stopTypingMessage,
    messageSagas.sendIfPhaseIsSend
  ),
  takeEvery(
    messageActionTypes.message.reducer.seenMessageAck,
    messageSagas.sendIfPhaseIsSend
  ),
  takeEvery(
    messageActionTypes.message.saga.sendMessage,
    messageSagas.sendIfPhaseIsSend
  ),
  takeEvery(
    messageActionTypes.message.saga.sendMessage,
    messageSagas.newMessage
  ),
];

export default sagas;
