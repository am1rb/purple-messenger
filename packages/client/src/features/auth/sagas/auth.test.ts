import { select } from "redux-saga/effects";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import {
  verifyToken,
  connected,
  disconnected,
  socketActionTypes,
} from "@purple-messenger/core";
import { getToken } from "features/auth/selectors";
import { handleReconnect, rootSaga } from "./auth";

describe("The auth sagas tests", () => {
  it("Should fork the reconnect correctly", () => {
    return expectSaga(rootSaga)
      .fork(handleReconnect)
      .run({ silenceTimeout: true });
  });

  it("Should handle reconnect event and verify the token if exists", () => {
    const token = "A token value";
    return expectSaga(handleReconnect)
      .provide([[select(getToken), token]])
      .dispatch(disconnected())
      .dispatch(connected())
      .put(verifyToken(token))
      .run({ silenceTimeout: true });
  });

  it("Should not call the verifyToken action if token is not available", () => {
    testSaga(handleReconnect)
      .next()
      .take(socketActionTypes.socket.reducer.disconnected)
      .next()
      .take(socketActionTypes.socket.reducer.connected)
      .next()
      .select(getToken)
      .next()
      .take(socketActionTypes.socket.reducer.disconnected); // start of the loop
  });
});
