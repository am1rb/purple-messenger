import { select } from "redux-saga/effects";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import {
  verifyToken,
  connected,
  socketActionTypes,
} from "@purple-messenger/core";
import { getToken } from "features/auth/selectors";
import { reconnect } from "./auth";

describe("The auth sagas tests", () => {
  it("Should handle reconnect event and verify the token if exists", () => {
    const token = "A token value";
    return expectSaga(reconnect)
      .provide([[select(getToken), token]])
      .dispatch(connected())
      .put(verifyToken(token))
      .run({ silenceTimeout: true });
  });

  it("Should not call the verifyToken action if token is not available", () => {
    testSaga(reconnect)
      .next()
      .take(socketActionTypes.socket.reducer.connected)
      .next()
      .select(getToken)
      .next()
      .isDone()
      .next()
      .finish();
  });
});
