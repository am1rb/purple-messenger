import reducer from "./auth";
import {
  setIsAuthenticated,
  setAuthError,
  setToken,
  signOut,
} from "@purple-messenger/core";

const state1 = reducer(undefined, setToken("A sample token"));
const state2 = reducer(state1, setAuthError("An error"));
const sharedState = state2;

describe("The auth reducer tests", () => {
  it("Should apply setIsAuthenticated action correctly", () => {
    [true, false].forEach((value) => {
      const state = reducer(undefined, setIsAuthenticated(value));
      expect(state.isAuthenticated).toBe(value);
    });
  });

  it("Should apply setAuthError action correctly", () => {
    const message = "The custom error message";
    const state = reducer(undefined, setAuthError(message));
    expect(state.authError).toBe(message);
  });

  it("Should apply setToken action correctly", () => {
    const token = "The application token";
    const state = reducer(undefined, setToken(token));
    expect(state.token).toBe(token);
    expect(state.isAuthenticated).toBeTruthy();
  });

  it("Should apply signOut action correctly", () => {
    const state = reducer(sharedState, signOut());
    expect(state.token).toBe("");
    expect(state.isAuthenticated).toBeFalsy();
  });

  it("Should apply resetToken action correctly", () => {
    const state = reducer(sharedState, signOut());
    expect(state.token).toBe("");
    expect(state.isAuthenticated).toBeFalsy();
  });
});
