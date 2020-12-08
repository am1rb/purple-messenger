import Socket from "core/type/socket";

export function openQueue(socket: Socket) {
  const username = socket.session?.username;
  if (!username) {
    return false;
  }

  socket.join(username);

  return true;
}

export function closeQueue(socket: Socket) {
  const username = socket.session?.username;
  if (!username) {
    return false;
  }

  socket.leave(username);

  return true;
}
