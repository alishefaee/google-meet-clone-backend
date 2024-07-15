import { TSocket } from '../types/socket'
import Cache from "../helper/cacheHelper"
import { Server } from "socket.io";
import {TCacheData} from "../types/cache-data";

export function onMessage(io: Server,socket: TSocket) {
  return (data: any, fn: Function) => {
    console.log('on message:', data);

    const user = Cache.get<TCacheData>(socket.handshake.auth.username)
    if (!user) {
      console.log('user not found')
      return
    }
    io.to(user.meetingId).emit('f:msg:new', {
      username: socket.handshake.auth.username,
      message: data.message,
      date: new Date()
    })
    fn()
  }
}