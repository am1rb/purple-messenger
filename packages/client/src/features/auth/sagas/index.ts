import { takeLatest } from "redux-saga/effects";
import { authActionTypes } from "@purple-messenger/core";
import * as socket from 'features/socket/effects';
import * as auth from './auth';

export default [
  takeLatest(authActionTypes.auth.saga.signIn, socket.send),
  takeLatest(authActionTypes.auth.saga.signOut, socket.send),
  takeLatest(authActionTypes.auth.saga.verifyToken, socket.send),
  auth.rootSaga(),
];