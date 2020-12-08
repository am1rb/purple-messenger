import Socket from "core/type/socket";
import { server, io } from "core/server";

import auth from "services/auth";
import conversation from "services/conversation";
import message from "services/message";

const serverPort = 8000;

server.listen(serverPort, function () {
  console.log("server run on " + serverPort);
});

io.on("connection", (socket: Socket) => {
  auth(socket);
  conversation(socket);
  message(socket);

  socket.on("disconnect", () => {
    console.log("disconnect");
  });
});
