import { TSocket } from '../types/socket'
import Cache from "../helper/cacheHelper"
import { Server } from "socket.io";
import {logRoomDetails} from "../utils/function";
import {TCacheData} from "../types/cache-data";

type TJoinMeeting = {
  meetingId: string
}
export function onJoinMeeting(io: Server,socket: TSocket) {
  return (data: TJoinMeeting, fn: Function) => {
    console.log('meeting joined:', data)
    let records = Cache.get<TCacheData[]>('users') || []
    records.push({
      meetingId: data.meetingId,
      connectionId: socket.id,
      username: socket.handshake.auth.username
    })
    Cache.set('users', records);

    const meetingId = data.meetingId
    io.to(meetingId).emit('new-member', { username: socket.handshake.auth.username });
    socket.join(meetingId);
    const roomPeople = records
        .map((u)=> u.meetingId == data.meetingId?u.username:undefined)
        .filter(Boolean) as string[]
    socket.emit('meeting-info', {people: roomPeople, meetingId: data.meetingId})
    fn()
    // logRoomDetails(io, meetingId, 'joining')
  }
}