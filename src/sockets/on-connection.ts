import { Server, Socket } from "socket.io";

export function onConnection(io: Server) {
  return async (socket: Socket) => {
    console.log('client connected')
  };
}