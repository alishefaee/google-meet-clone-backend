import { Server, Socket } from "socket.io";
import { onJoinMeeting } from './on-join-meeting'
import {onCreateMeeting} from "./on-create-meeting";
import {logRoomDetails} from "../utils/function";
import Cache from "../helper/cacheHelper";

export function onConnection(io: Server) {
  return async (socket: Socket) => {
    console.log('client connected');
    socket.on('join-meeting', (data, fn) => {
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
    });
    socket.on('create-meeting', (data, fn) => {
      console.log('create meeting:', data);

      let updated: any = Cache.get('users') || [];
      updated.push({
        meetingId: data.meetingId,
        connectionId: socket.id,
        username: socket.handshake.auth.username
      });
      Cache.set('users', updated);
      socket.join(data.meetingId.toString()); // Join the custom room with meetingId
      logRoomDetails(io, data.meetingId);
      fn();
    });
  }
}