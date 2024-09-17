import { TSocket } from '../types/socket'
import Cache from '../helper/cacheHelper'
import { Server } from 'socket.io'
import { TCacheData } from '../types/cache-data'

type TJoinMeeting = {
  meetingId: string
}
export function onJoinMeeting(io: Server, socket: TSocket) {
  return (data: TJoinMeeting, fn: Function) => {
    console.log('meeting joined:', data)
    const creatorUsername = Cache.keys().find(
      (u) =>
        Cache.get<TCacheData>(u)!.isCreator && Cache.get<TCacheData>(u)!.meetingId == data.meetingId
    )
    if (!creatorUsername) {
      console.log('Can not join right now')
      socket.emit('f:meeting:error', { msg: 'Can not join right now' })
      return
    }

    io.to(Cache.get<TCacheData>(creatorUsername)!.connectionId).emit('f:people:join-request', {
      username: socket.handshake.auth.username,
      meetingId: data.meetingId,
      connectionId: socket.id
    })

    Cache.set(socket.handshake.auth.username, {
      meetingId: data.meetingId,
      connectionId: socket.id,
      username: socket.handshake.auth.username,
      isCreator: false
    })

    const { meetingId } = data
    io.to(meetingId).emit('f:people:new', { username: socket.handshake.auth.username })
    socket.join(meetingId)
    const roomPeople = Cache.keys()
      .map((u) =>
        Cache.get<TCacheData>(u)!.meetingId == data.meetingId
          ? Cache.get<TCacheData>(u)!.username
          : undefined
      )
      .filter(Boolean) as string[]
    socket.emit('f:meeting:info', { people: roomPeople, meetingId: data.meetingId })
    fn()
  }
}
