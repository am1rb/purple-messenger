import type { Action } from "redux";

export function dispatch(emitter: NodeJS.EventEmitter, action: Action) {
  emitter.emit("dispatch", action);
}
