import socket, { SocketState } from './socket';

export interface State {
  socket: SocketState;
}

export default { socket };
