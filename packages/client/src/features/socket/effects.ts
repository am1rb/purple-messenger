import { put, take, select } from "redux-saga/effects";
import { Action } from "redux";
import { sendData, socketActionTypes } from "@purple-messenger/core";
import { getIsReady } from "./selectors";

export function* send(action: Action) {
  const isReady = yield select(getIsReady);
  if (!isReady) {
    yield take(socketActionTypes.socket.reducer.setIsReady);
  }
  yield put(sendData(action));
}
