import { put, take, select } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";
import { sendData, socketActionTypes } from "@purple-messenger/core";
import { send } from "./effects";
import { getIsReady } from "./selectors";

jest.unmock("@purple-messenger/core");

describe("The socket effects tests", () => {
  it("Should send data if the socket is ready", () => {
    const action = { type: "DO_SOMETHING" };
    return expectSaga(send, action)
      .provide([[select(getIsReady), true]])
      .put(sendData(action))
      .run();
  });

  it("Should not send data and wait for socket if the socket is not ready", () => {
    const action = { type: "DO_SOMETHING" };
    return expectSaga(send, action)
      .provide([[select(getIsReady), false]])
      .take(socketActionTypes.socket.reducer.setIsReady)
      .run();
  });
});
