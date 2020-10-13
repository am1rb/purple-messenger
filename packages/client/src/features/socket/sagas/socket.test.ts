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
  sendData,
  setIsReady,
  socketActionTypes,
} from "@purple-messenger/core";

describe("The socket saga tests", () => {
  it("Should connect to the server properly", async () => {
    const socket = await connect();
    expect(socket.connected).toBeTruthy();
  });

  it("Should read saga work correctly", () => {
    const socket = socketIOClient("server-address");
    const channel = "sample-channel";
    const action = { type: "sample-action1" };

    testSaga(read, socket)
      .next()
      .call(subscribe, socket)
      .next(channel)
      .take(channel)
      .next(action)
      .put(action);
  });

  it("Should write saga work correctly", () => {
    const socket = socketIOClient("server-address");
    const action = { type: "sample-action1" };
    const handleWrite = jest.fn();

    socket.on(action.type, handleWrite);

    testSaga(write, socket)
      .next()
      .take(socketActionTypes.socket.saga.sendData)
      .next(sendData(action));

    expect(handleWrite).toHaveBeenCalledWith(action);
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
});
