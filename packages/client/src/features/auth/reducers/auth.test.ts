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
  it("Should read initial token value from local storage", () => {
    const initialTokenValue = "initial-token-value";
    const getItemMock = jest
      .spyOn(window.localStorage.__proto__, "getItem")
      .mockReturnValue(initialTokenValue);

    const state = reducer(undefined, { type: "" });

    expect(state.token).toBe(initialTokenValue);
    getItemMock.mockClear();
  });

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
    const setItemMock = jest.spyOn(window.localStorage.__proto__, "setItem");

    const token = "The application token";
    const state = reducer(undefined, setToken(token));
    expect(state.token).toBe(token);
    expect(state.isAuthenticated).toBeTruthy();
    expect(setItemMock).toHaveBeenCalledWith("token", token);

    setItemMock.mockClear();
  });

  it("Should apply signOut action correctly", () => {
    const removeItemMock = jest.spyOn(
      window.localStorage.__proto__,
      "removeItem"
    );

    const state = reducer(sharedState, signOut());
    expect(state.token).toBe("");
    expect(state.isAuthenticated).toBeFalsy();
    expect(removeItemMock).toHaveBeenCalledWith("token");

    removeItemMock.mockClear();
  });

  it("Should apply resetToken action correctly", () => {
    const removeItemMock = jest.spyOn(
      window.localStorage.__proto__,
      "removeItem"
    );

    const state = reducer(sharedState, signOut());
    expect(state.token).toBe("");
    expect(state.isAuthenticated).toBeFalsy();
    expect(removeItemMock).toHaveBeenCalledWith("token");

    removeItemMock.mockClear();
  });
});
