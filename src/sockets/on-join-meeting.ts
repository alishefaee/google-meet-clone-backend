import { TSocket } from '../types/socket'
import Cache from "../helper/cacheHelper"
import { Server } from "socket.io";
import {logRoomDetails} from "../utils/function";

export function onJoinMeeting(io: Server,socket: TSocket) {

  return (data: any, fn: Function) => {
    console.log('join meeting:', data);
    fn();
    let updated: any = Cache.get('users') || [];
    updated.push({
      meetingId: data.meetingId.toString(),
      connectionId: socket.id,
      username: socket.handshake.auth.username
    });
    Cache.set('users', updated);
    const roomId = data.meetingId.toString();
    io.to(roomId).emit('new-member', { username: socket.handshake.auth.username });
    socket.join(roomId);
    const roomPeople = updated.map((u:any)=> u.meetingId == data.meetingId.toString()?u.username:undefined).filter(Boolean)
    socket.emit('room-info', {people: roomPeople})
    logRoomDetails(io, roomId, 'joining');
  }
}