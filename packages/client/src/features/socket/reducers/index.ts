import socket, { SocketState } from "./socket";

export interface State {
  socket: SocketState;
}

const reducers = { socket };

export default reducers;
