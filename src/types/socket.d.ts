import { Socket } from 'socket.io'

export type TSocket = Socket & {
  username?: string
}