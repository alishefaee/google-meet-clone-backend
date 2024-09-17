import { Server } from 'socket.io'
import { TSocket } from '../types/socket'

export function onDisconnection(io: Server, socket: TSocket) {
  return (data: any, fn: Function) => {
    console.log('Client disconnected:', socket.id)
  }
}
