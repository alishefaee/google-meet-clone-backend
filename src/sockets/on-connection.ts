import { Server, Socket } from 'socket.io'
import { onJoinMeeting } from './on-join-meeting'
import { onCreateMeeting } from './on-create-meeting'
import { onMessage } from './on-message'
import { onDisconnection } from './on-diconnection'

export function onConnection(io: Server) {
  return async (socket: Socket) => {
    console.log('client connected')
    socket.on('s:meeting:create', onCreateMeeting(io, socket))
    socket.on('s:meeting:join', onJoinMeeting(io, socket))
    socket.on('s:msg:new', onMessage(io, socket))
    socket.on('offer', (offer) => {
      console.log('Offer received:', offer)
      socket.broadcast.emit('offer', offer)
    })

    socket.on('answer', (answer) => {
      console.log('Answer received:', answer)
      socket.broadcast.emit('answer', answer)
    })

    socket.on('candidate', (candidate) => {
      console.log('Candidate received:', candidate)
      socket.broadcast.emit('candidate', candidate)
    })
    socket.on('offer', ({ offer, meetingId }) => {
      console.log('Offer received:', offer)
      socket.to(meetingId).emit('offer', { offer, meetingId })
    })

    socket.on('answer', ({ answer, meetingId }) => {
      console.log('Answer received:', answer)
      socket.to(meetingId).emit('answer', answer)
    })

    socket.on('candidate', (candidate) => {
      console.log('Candidate received:', candidate)
      socket.broadcast.emit('candidate', candidate)
    })

    socket.on('disconnect', onDisconnection(io, socket))
  }
}
