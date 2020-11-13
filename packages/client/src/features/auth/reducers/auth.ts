import {
  authActionTypes as actionTypes,
  SetIsAuthenticatedAction,
  SetAuthErrorAction,
  SetTokenAction,
  SingOutAction,
  ResetTokenAction,
} from "@purple-messenger/core";

export interface AuthState {
  isAuthenticated: boolean;
  token?: string;
  authError: string;
}

function authReducer(
  currentState: AuthState | undefined,
  action:
    | SetIsAuthenticatedAction
    | SetAuthErrorAction
    | SetTokenAction
    | SingOutAction
    | ResetTokenAction
): AuthState {
  const state: AuthState = currentState ?? {
    isAuthenticated: false,
    token: localStorage.getItem("token")
      ? (localStorage.getItem("token") as string)
      : undefined,
    authError: "",
  };

  switch (action.type) {
    case actionTypes.auth.reducer.setIsAuthenticated: {
      return {
        ...state,
        isAuthenticated: action.status,
      };
    }
    case actionTypes.auth.reducer.setAuthError: {
      return {
        ...state,
        authError: action.message,
      };
    }
    case actionTypes.auth.reducer.setToken: {
      localStorage.setItem("token", action.token);
      return {
        ...state,
        token: action.token,
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

export default authReducer;
