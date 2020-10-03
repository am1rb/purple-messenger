import { select } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";
import { verifyToken, connected, disconnected } from "@purple-messenger/core";
import { getToken } from "features/auth/selectors";
import { handleReconnect, rootSaga } from "./auth";

jest.unmock("@purple-messenger/core");

describe("The auth sagas tests", () => {
  it("Should fork the reconnect correctly", () => {
    return expectSaga(rootSaga).fork(handleReconnect).run();
  });

  it("Should handle reconnect event and verify the token if exists", () => {
    const token = "A token value";
    return expectSaga(handleReconnect)
      .provide([[select(getToken), token]])
      .dispatch(disconnected())
      .dispatch(connected())
      .put(verifyToken(token))
      .run();
  });
});
