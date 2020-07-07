import auth, { AuthState } from './auth';

export interface State {
  auth: AuthState;
}

export default { auth };
