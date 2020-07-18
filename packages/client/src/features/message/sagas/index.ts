import { takeLatest, takeEvery } from 'redux-saga/effects';
import { messageActionTypes } from '@purple-messenger/core';
import * as socket from 'features/socket/effects';
import * as messageSagas from './message';

export default [
  takeEvery(messageActionTypes.message.saga.submitMessage, messageSagas.submitMessage),
  takeEvery(messageActionTypes.message.reducer.sendMessage, socket.send),
  takeEvery(messageActionTypes.message.reducer.startTypingMessage, socket.send),
  takeEvery(messageActionTypes.message.reducer.stopTypingMessage, socket.send),
]