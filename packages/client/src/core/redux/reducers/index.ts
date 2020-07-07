import { combineReducers } from 'redux';
import { connectRouter, RouterRootState } from 'connected-react-router';
import { History } from 'history';

import authReducers, { State as AuthState } from 'features/auth/reducers';
import socketReducers, { State as SocketState } from 'features/socket/reducers';
import profileReducers, { State as ProfileState } from 'features/profile/reducers';

export type State = RouterRootState & AuthState & SocketState & ProfileState;

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    ...authReducers,
    ...socketReducers,
    ...profileReducers,
  });

export default createRootReducer;
