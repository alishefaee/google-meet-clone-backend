import dotenv from "dotenv"
import http from "http";

dotenv.config()

import {socketServer} from "./init/socket"

import {app} from "./init/app";
const server = http.createServer(app);
const port = process.env.PORT || 4000;

const io = socketServer(server);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error:any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  console.log('listening on '+ bind)
}

export { server, io };