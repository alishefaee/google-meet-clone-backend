import {TSocket} from '../types/socket'
import Cache from "../helper/cacheHelper";

export function onCreateMeeting(socket: TSocket) {
    console.log('Here')
    return (data: any, fn: any) => {
        console.log('create meeting:', data)
        let updated: any = Cache.get('users')
        updated.push({
            meetingId: data.meetingId,
            connectionId: socket.id,
            username: socket.handshake.auth.username
        })
        console.log('updated:', updated)
        Cache.set('users', updated)
        fn()
    }
}