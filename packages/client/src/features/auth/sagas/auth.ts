import { put, fork, take, select } from "redux-saga/effects";
import { socketActionTypes, verifyToken } from "@purple-messenger/core";
import { getToken } from "features/auth/selectors";

export function* handleReconnect() {
  while (true) {
    yield take(socketActionTypes.socket.reducer.disconnected);
    yield take(socketActionTypes.socket.reducer.connected);

    const token = yield select(getToken);

    if (token) {
      yield put(verifyToken(token));
    }
  }
}

export function* rootSaga() {
  yield fork(handleReconnect);
}
