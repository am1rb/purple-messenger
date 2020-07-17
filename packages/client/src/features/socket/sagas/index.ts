import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { put, fork, take, call, cancel } from 'redux-saga/effects';
import { Action } from 'redux';
import {
  connected,
  disconnected,
  SendDataAction,
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
    const handleConnect = () => emit(connected());    
    const handleDisconnect = () => emit(disconnected());
    const handleDispatch = (action: Action) => emit(action);
    
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('dispatch', handleDispatch);

    return function() {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('dispatch', handleDispatch);
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
    const action: SendDataAction = yield take(
      socketActionTypes.socket.saga.sendData
    );
    socket.emit(action.data.type, action.data);
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
