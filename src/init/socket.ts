import { Server } from 'socket.io'
import http from 'http'
import { authSocketMid } from '../middlewares/auth.middleware'
import { onConnection } from '../sockets/on-connection'

export function socketServer(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: '*'
    }
  })

  io.use(authSocketMid)
  io.on('connection', onConnection(io))

  return io
}
