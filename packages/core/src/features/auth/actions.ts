import actionTypes from "./actionTypes";

export const signIn = (email: string, password: string) => ({
  type: actionTypes.auth.saga.signIn,
  email,
  password,
});
export type SingInAction = ReturnType<typeof signIn>;

export const signOut = () => ({ type: actionTypes.auth.saga.signOut });
export type SingOutAction = ReturnType<typeof signOut>;

export const setIsAuthenticated = (status: boolean) => ({
  type: actionTypes.auth.reducer.setIsAuthenticated,
  status,
});
export type SetIsAuthenticatedAction = ReturnType<typeof setIsAuthenticated>;

export const setToken = (token: string) => ({
  type: actionTypes.auth.reducer.setToken,
  token,
});
export type SetTokenAction = ReturnType<typeof setToken>;

export const resetToken = () => ({
  type: actionTypes.auth.reducer.resetToken,
});
export type ResetTokenAction = ReturnType<typeof resetToken>;

export const setAuthError = (message: string) => ({
  type: actionTypes.auth.reducer.setAuthError,
  message,
});
export type SetAuthErrorAction = ReturnType<typeof setAuthError>;

export const resetAuthError = () => ({
  type: actionTypes.auth.reducer.setAuthError,
  message: "",
});

export const verifyToken = (token: string) => ({
  type: actionTypes.auth.saga.verifyToken,
  token,
});
export type VerifyTokenAction = ReturnType<typeof verifyToken>;
