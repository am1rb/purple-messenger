import type { Socket as MSocket } from "socket.io";
import Session from "./session";

interface Socket extends MSocket {
  session?: Session;
}

export default Socket;
