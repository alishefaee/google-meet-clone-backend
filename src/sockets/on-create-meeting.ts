import {TSocket} from '../types/socket'
import Cache from "../helper/cacheHelper";
import { Server } from "socket.io";
import {logRoomDetails} from "../utils/function";
import {TCacheData} from "../types/cache-data";

type TCreateMeeting = {
    meetingId: string
}
export function onCreateMeeting(io: Server,socket: TSocket) {
    return (data: TCreateMeeting, fn: Function) => {
        console.log('meeting created:', data)
        let records = Cache.get<TCacheData[]>('users') || []
        records.push({
            meetingId: data.meetingId,
            connectionId: socket.id,
            username: socket.handshake.auth.username
        });
        Cache.set('users', records);
        const meetingId = data.meetingId
        socket.join(meetingId);
        logRoomDetails(io, meetingId, 'create')
        fn()
    }
}