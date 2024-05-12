import { Server, Socket } from "socket.io";
import { onJoinMeeting } from './on-join-meeting'
import {onCreateMeeting} from "./on-create-meeting";

export function onConnection(io: Server) {
  return async (socket: Socket) => {
    console.log('client connected')
    socket.on('join-meeting', onJoinMeeting(socket))
    socket.on('create-meeting', onCreateMeeting(socket))
  }
}