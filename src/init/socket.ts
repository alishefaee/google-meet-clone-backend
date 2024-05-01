import {Server, Socket} from "socket.io";
import http from "http";
// import { socketAuthMiddleware } from "../middlewares/socket-auth";
import {onConnection} from "../sockets/on-connection";

export function socketServer(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    },
    // allowUpgrades: false
  });

  // io.use(socketAuthMiddleware);

  io.on("connection", onConnection(io));

  return io;
}