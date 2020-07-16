import { Action } from "redux";
import Socket from "core/type/socket";
import { dispatch } from "core/helper/client";

const queue: Record<string, Socket[]> = {};

export function openQueue(socket: Socket) {
  const queueId = socket.session?.username;
  if (!queueId) {
    return false;
  }

  if (!queue[queueId]) {
    queue[queueId] = [];
  }
  queue[queueId].push(socket);

  return true;
}

export function closeQueue(socket: Socket) {
  const queueId = socket.session?.username;
  if (!queueId || !queue[queueId]) {
    return false;
  }

  const index = queue[queueId].indexOf(socket);
  if (index !== -1) {
    queue[queueId].splice(index, 1);
  }

  if (queue[queueId].length === 0) {
    delete queue[queueId];
  }

  return true;
}

export function dispatchQueue(queueId: string, action: Action) {
  if(!queue[queueId]) {
    return false;
  }

  queue[queueId].forEach((socket) => dispatch(socket, action));

  return true;
}
