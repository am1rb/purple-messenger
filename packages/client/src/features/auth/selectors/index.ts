import { State } from '../reducers';

export const isAuthenticated = (state: State) => state.auth.isAuthenticated;

export const getAuthError = (state: State) => state.auth.authError;

export const getToken = (state: State) => state.auth.token;
