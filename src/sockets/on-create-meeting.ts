import {TSocket} from '../types/socket'
import Cache from "../helper/cacheHelper";
import { Server } from "socket.io";
import {logRoomDetails} from "../utils/function";

export function onCreateMeeting(io: Server,socket: TSocket) {
    return (data: any, fn: Function) => {
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
    }
}