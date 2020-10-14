import io from "socket.io-client";
import { eventChannel } from "redux-saga";
import { put, fork, take, call, cancel, takeEvery } from "redux-saga/effects";
import { Action } from "redux";
import {
  connected,
  disconnected,
  SendDataAction,
  socketActionTypes,
  appActionTypes,
  setIsReady,
} from "@purple-messenger/core";

export function connect(serverURL = "http://localhost:8000") {
  const socket = io(serverURL);
  return new Promise<SocketIOClient.Socket>((resolve, reject) => {
    socket.on("connect", () => resolve(socket));
    socket.on("disconnect", reject);
  });
}

export const subscribe = (socket: SocketIOClient.Socket) =>
  eventChannel((emit) => {
    const handleConnect = () => emit(connected());
    const handleDisconnect = () => emit(disconnected());
    const handleDispatch = (action: Action) => emit(action);

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("dispatch", handleDispatch);

    return function () {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("dispatch", handleDispatch);
    };
  });

export function* read(socket: SocketIOClient.Socket) {
  const channel = yield call(subscribe, socket);
  yield takeEvery(channel, function* (action: Action) {
    yield put(action);
  });
}

export function* write(socket: SocketIOClient.Socket) {
  yield takeEvery(socketActionTypes.socket.saga.sendData, function* (
    action: SendDataAction
  ) {
    socket.emit(action.data.type, action.data);
  });
}

export function* handleIO(socket: SocketIOClient.Socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}

export function* execSocket() {
  while (true) {
    yield take(appActionTypes.app.saga.start);

    const socket: SocketIOClient.Socket = yield call(connect);
    yield put(connected());

    const ioTask = yield fork(handleIO, socket);
    yield put(setIsReady(true));

    yield take(appActionTypes.app.saga.shutdown);

    socket.disconnect();

    yield cancel(ioTask);
    yield put(setIsReady(false));
  }
}
