import auth, { AuthState } from "./auth";

export interface State {
  auth: AuthState;
}

const reducers = { auth };

export default reducers;
