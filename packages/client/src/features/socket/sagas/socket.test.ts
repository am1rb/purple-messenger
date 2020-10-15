import { expectSaga, testSaga } from "redux-saga-test-plan";
import socketIOClient from "socket.io-client";

import {
  connect,
  subscribe,
  read,
  write,
  handleIO,
  execSocket,
} from "./socket";
import {
  appActionTypes,
  connected,
  disconnected,
  sendData,
  setIsReady,
} from "@purple-messenger/core";
import { put, takeEvery } from "redux-saga/effects";
import { Action } from "redux";

function getSubscribedSaga(
  socketFunc: (socket: SocketIOClient.Socket) => () => void
) {
  const socket = socketIOClient("server-address");
  const channel = subscribe(socket);

  function* saga() {
    setTimeout(socketFunc(socket), 0);
    yield takeEvery(channel, function* (action: Action) {
      yield put(action);
    });
  }

  return { saga, channel, socket };
}

describe("The socket saga tests", () => {
  it("Should connect to the server properly", async () => {
    const socket = await connect();
    expect(socket.connected).toBeTruthy();
  });

  it("Should read saga work correctly", () => {
    const socket = socketIOClient("server-address");

    const action1 = { type: "sample-action1" };
    const action2 = { type: "sample-action2" };

    setTimeout(() => {
      socket.emit("dispatch", action1);
      socket.emit("dispatch", action2);
    }, 5);

    return expectSaga(read, socket)
      .put(action1)
      .put(action2)
      .run({ silenceTimeout: true });
  });

  it("Should write saga work correctly", () => {
    const socket = socketIOClient("server-address");
    const action = { type: "sample-action1" };
    const handleWrite = jest.fn();

    socket.on(action.type, handleWrite);

    return expectSaga(write, socket)
      .dispatch(sendData(action))
      .run({ silenceTimeout: true })
      .finally(() => {
        expect(handleWrite).toHaveBeenCalledWith(action);
      });
  });

  it("Should handle io properly", () => {
    const socket = socketIOClient("server-address");
    return expectSaga(handleIO, socket)
      .fork(read, socket)
      .fork(write, socket)
      .run({ silenceTimeout: true });
  });

  it("Should run socket logic correctly", () => {
    const socket = socketIOClient("server-address");
    const handleConnect = jest.fn();
    const handleDisconnect = jest.fn();

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    testSaga(execSocket)
      .next()
      .take(appActionTypes.app.saga.start)
      .next()
      .call(connect)
      .next(socket)
      .put(connected())
      .next()
      .fork(handleIO, socket)
      .next()
      .put(setIsReady(true))
      .next()
      .take(appActionTypes.app.saga.shutdown)
      .next()
      .cancel(undefined as any)
      .next()
      .put(setIsReady(false))
      .next();

    expect(handleDisconnect).toHaveBeenCalled();
  });

  it("Should subscribe emit the connected action correctly", () => {
    const { saga } = getSubscribedSaga((socket) => () => socket.disconnect());
    return expectSaga(saga).put(connected()).run({ silenceTimeout: true });
  });

  it("Should subscribe emit the disconnect action correctly", () => {
    const { saga } = getSubscribedSaga((socket) => () => socket.disconnect());
    return expectSaga(saga).put(disconnected()).run({ silenceTimeout: true });
  });

  it("Should subscribe emit the dispatched action correctly", () => {
    const action = { type: "sample-action" };
    const { saga } = getSubscribedSaga((socket) => () =>
      socket.emit("dispatch", action)
    );
    return expectSaga(saga).put(action).run({ silenceTimeout: true });
  });

  it("Should remove callbacks when the channel is closed", () => {
    const { saga, channel, socket } = getSubscribedSaga(() => () => {});
    return expectSaga(saga)
      .run({ silenceTimeout: true })
      .then(() => {
        channel.close();
        expect(socket.listeners("connect")).toHaveLength(0);
        expect(socket.listeners("disconnect")).toHaveLength(0);
        expect(socket.listeners("dispatch")).toHaveLength(0);
      });
  });
});
