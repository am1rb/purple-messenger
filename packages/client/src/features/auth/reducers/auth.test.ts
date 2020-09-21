import reducer from "./auth";
import { setIsAuthenticated } from "@purple-messenger/core";

jest.unmock("@purple-messenger/core");

describe("The auth reducer tests", () => {
  it("Should apply setIsAuthenticated action correctly", () => {
    [true, false].forEach((value) => {
      const state = reducer(undefined, setIsAuthenticated(value));
      expect(state.isAuthenticated).toBe(value);
    });
  });
  // it("Should apply setAuthError action correctly", () => {

  // });
  // it("Should apply setToken action correctly", () => {

  // });
  // it("Should apply signOut action correctly", () => {

  // });
  // it("Should apply resetToken action correctly", () => {

  // });
});
