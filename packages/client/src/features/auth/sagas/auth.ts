import { put, take, select } from "redux-saga/effects";
import { socketActionTypes, verifyToken } from "@purple-messenger/core";
import { getToken } from "features/auth/selectors";

export function* reconnect() {
  yield take(socketActionTypes.socket.reducer.connected);

  const token = yield select(getToken);

  if (token) {
    yield put(verifyToken(token));
  }
}
