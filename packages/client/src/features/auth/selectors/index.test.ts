import { InitialStore } from "core/test";
import { getAuthError, getToken, isAuthenticated } from ".";
import { State } from "core/redux/reducers";

const sharedState: InitialStore = {
  auth: {
    authError: "The error text",
    isAuthenticated: true,
    token: "Token string",
  },
};

describe("The auth selectors tests", () => {
  it("Should return authError correctly", () => {
    expect(getAuthError(sharedState as State)).toBe(
      sharedState.auth?.authError
    );
  });

  it("Should return isAuthenticated correctly", () => {
    expect(isAuthenticated(sharedState as State)).toBe(
      sharedState.auth?.isAuthenticated
    );
  });

  it("Should return token correctly", () => {
    expect(getToken(sharedState as State)).toBe(sharedState.auth?.token);
  });
});
