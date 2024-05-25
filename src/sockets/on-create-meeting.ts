import {TSocket} from '../types/socket'
import Cache from "../helper/cacheHelper";
import { Server } from "socket.io";
import {logRoomDetails} from "../utils/function";

export function onCreateMeeting(io: Server,socket: TSocket) {
    return (data: any, fn: Function) => {
        console.log('create meeting:', data);
        let updated: any = Cache.get('users') || [];
        updated.push({
            meetingId: data.meetingId.toString(),
            connectionId: socket.id,
            username: socket.handshake.auth.username
        });
        Cache.set('users', updated);
        const roomId = data.meetingId.toString();
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId} after create.`);
        logRoomDetails(io, roomId, 'create');
        fn();
        console.log('----------------------------------')
    }
}