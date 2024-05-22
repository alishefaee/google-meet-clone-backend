
import { TSocket } from '../types/socket'

type Next = (err?: Error) => void

export function authSocketMid(socket: TSocket, next: Next) {
  console.log('socket middleware')
  console.log(socket.handshake.auth.username)

  const username = socket.handshake.auth.username as string
  if (!username) return next(new Error('username not found'))
  socket.username = username
  next()
}
