import { TSocket } from '../types/socket'
import Cache from "../helper/cacheHelper"
import { Server } from "socket.io";

export function onMessage(io: Server,socket: TSocket) {
  return (data: any, fn: Function) => {
    console.log('on message:', data);
    fn();
    let updated: any = Cache.get('users') || []
    console.log('updated:', updated)

    const {meetingId} = updated.find((u:any)=>u.username==socket.handshake.auth.username)

    io.to(meetingId).emit('new-message', {
      username: socket.handshake.auth.username,
      message: data.message,
      date: new Date()
    })
  }
}