import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { put, fork, take, call, cancel } from 'redux-saga/effects';
import { Action } from 'redux';
import {
  connected,
  disconnected,
  SendMessageAction,
  socketActionTypes,
  appActionTypes,
  setIsReady,
} from '@purple-messenger/core';

const serverURL = 'http://localhost:8000';

function connect() {
  const socket = io(serverURL);
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

const subscribe = (socket: SocketIOClient.Socket) =>
  eventChannel(emit => {
    const handleConnect = () => {
      emit(connected());
    };
    socket.on('connect', handleConnect);

    const handleDisconnect = () => {
      emit(disconnected());
    };
    socket.on('disconnect', handleDisconnect);

    const handleMessage = (action: Action) => {
      emit(action);
    };
    socket.on('message', handleMessage);

    return function() {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('message', handleMessage);
    };
  });

function* read(socket: SocketIOClient.Socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* write(socket: SocketIOClient.Socket) {
  while (true) {
    const action: SendMessageAction = yield take(
      socketActionTypes.socket.saga.sendMessage
    );
    socket.emit(action.message.type, action.message);
  }
}

function* handleIO(socket: SocketIOClient.Socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}

export function* rootSaga() {
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

export default [rootSaga()];
