import { fork, take, select, put } from "redux-saga/effects";
import { handleReconnect, rootSaga } from "./auth";
import { socketActionTypes, verifyToken } from "@purple-messenger/core";
import { getToken } from "../selectors";

describe("The auth sagas tests", () => {
  it("Should fork the reconnect correctly", () => {
    const rootGen = rootSaga();
    expect(rootGen.next().value).toEqual(fork(handleReconnect));
  });

  it("Should handle reconnect event and verify the token if exists", () => {
    const gen = handleReconnect();

    // wait for the disconnect event
    expect(gen.next().value).toEqual(
      take(socketActionTypes.socket.reducer.disconnected)
    );

    // wait for the connect event
    expect(gen.next().value).toEqual(
      take(socketActionTypes.socket.reducer.connected)
    );

    // get the token
    expect(gen.next().value).toEqual(select(getToken));

    // call the verifyToken action
    const token = "A token value";
    expect(gen.next(token).value).toEqual(put(verifyToken(token)));
  });
});
