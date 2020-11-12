import { takeLatest } from "redux-saga/effects";
import { authActionTypes, socketActionTypes } from "@purple-messenger/core";
import * as socket from "features/socket/effects";
import * as auth from "./auth";

const sagas = [
  takeLatest(authActionTypes.auth.saga.signIn, socket.send),
  takeLatest(authActionTypes.auth.saga.signOut, socket.send),
  takeLatest(authActionTypes.auth.saga.verifyToken, socket.send),
  takeLatest(socketActionTypes.socket.reducer.disconnected, auth.reconnect),
];

export default sagas;
