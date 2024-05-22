import { TSocket } from '../types/socket'
import Cache from "../helper/cacheHelper"
import { Server } from "socket.io";
import {logRoomDetails} from "../utils/function";

export function onJoinMeeting(io: Server,socket: TSocket) {

  return (data: any, fn: Function) => {
    console.log('join meeting:', data);

    let updated: any = Cache.get('users') || [];
    updated.push({
      meetingId: data.meetingId,
      connectionId: socket.id,
      username: socket.handshake.auth.username
    });
    Cache.set('users', updated);
    socket.join(data.meetingId.toString()); // Join the custom room with meetingId
    logRoomDetails(io, data.meetingId);
    socket.to(data.meetingId).emit('new-member', { username: socket.handshake.auth.username });
    fn();
  }
}