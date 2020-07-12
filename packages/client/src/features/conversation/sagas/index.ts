import { takeLatest } from 'redux-saga/effects';
import { conversationActionTypes } from '@purple-messenger/core';
import * as socket from 'features/socket/effects';

export default [
  takeLatest(conversationActionTypes.conversation.saga.loadConversationList, socket.send),
  takeLatest(conversationActionTypes.conversation.saga.unloadConversationList, socket.send),
]