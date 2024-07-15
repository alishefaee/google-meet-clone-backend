import {TSocket} from '../types/socket'
import Cache from "../helper/cacheHelper";
import {Server} from "socket.io";
import {logRoomDetails} from "../utils/function";
import {UserRoleEnum} from "../enums/user-role.enum";

type TCreateMeeting = {
    meetingId: string
}

export function onCreateMeeting(io: Server, socket: TSocket) {
    return (data: TCreateMeeting, fn: Function) => {
        console.log('meeting created:', data)
        Cache.set(socket.handshake.auth.username, {
            meetingId: data.meetingId,
            connectionId: socket.id,
            username: socket.handshake.auth.username,
            role: UserRoleEnum.CREATOR
        });

        const meetingId = data.meetingId
        socket.join(meetingId);
        logRoomDetails(io, meetingId, 'create')
        fn()
    }
}