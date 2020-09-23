import {
  authActionTypes as actionTypes,
  SetIsAuthenticatedAction,
  SetAuthErrorAction,
  SetTokenAction,
  SingOutAction,
} from "@purple-messenger/core";

export interface AuthState {
  isAuthenticated: boolean;
  token?: string;
  authError: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: localStorage.getItem("token")
    ? (localStorage.getItem("token") as string)
    : undefined,
  authError: "",
};

function authState(
  state: AuthState = initialState,
  action:
    | SetIsAuthenticatedAction
    | SetAuthErrorAction
    | SetTokenAction
    | SingOutAction
): AuthState {
  switch (action.type) {
    case actionTypes.auth.reducer.setIsAuthenticated: {
      const setIsAuthenticated = action as SetIsAuthenticatedAction;
      return {
        ...state,
        isAuthenticated: setIsAuthenticated.status,
      };
    }
    case actionTypes.auth.reducer.setAuthError: {
      const setAuthErrorAction = action as SetAuthErrorAction;
      return {
        ...state,
        authError: setAuthErrorAction.message,
      };
    }
    case actionTypes.auth.reducer.setToken: {
      const setTokenAction = action as SetTokenAction;
      localStorage.setItem("token", setTokenAction.token);
      return {
        ...state,
        token: setTokenAction.token,
        isAuthenticated: true,
      };
    }
    case actionTypes.auth.saga.signOut:
    case actionTypes.auth.reducer.resetToken: {
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        isAuthenticated: false,
      };
    }
    default:
      return state;
  }
}

export default authState;
