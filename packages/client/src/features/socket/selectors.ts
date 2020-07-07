import { State } from './reducers';

export const getIsReady = (state: State) => state.socket.isReady;

export const getIsConnected = (state: State) => state.socket.isConnected;
