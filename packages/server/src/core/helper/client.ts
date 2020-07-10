import type { Action } from "redux";
import type { Socket } from "socket.io";

export function dispatch(socket: Socket, action: Action) {
  socket.emit("dispatch", action);
}
