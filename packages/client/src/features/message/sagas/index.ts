import { takeEvery } from 'redux-saga/effects';
import { messageActionTypes } from '@purple-messenger/core';
import * as socket from 'features/socket/effects';
import * as messageSagas from './message';

export default [
  takeEvery(messageActionTypes.message.saga.submitMessage, messageSagas.submitMessage),
  takeEvery(messageActionTypes.message.saga.startTypingMessage, messageSagas.startTypingMessage),
  takeEvery(messageActionTypes.message.saga.stopTypingMessage, messageSagas.stopTypingMessage),
  takeEvery(messageActionTypes.message.saga.newMessage, messageSagas.newMessage),
  takeEvery(messageActionTypes.message.reducer.sendMessage, socket.send),
  takeEvery(messageActionTypes.message.reducer.seenMessageAck, socket.send),  
]