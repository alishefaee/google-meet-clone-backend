import {Server, Socket} from "socket.io";
import {onJoinMeeting} from './on-join-meeting'
import {onCreateMeeting} from "./on-create-meeting";
import {onMessage} from "./on-message";

export function onConnection(io: Server) {
    return async (socket: Socket) => {
        console.log('client connected');
        socket.on('s:meeting:create', onCreateMeeting(io, socket));
        socket.on('s:meeting:join', onJoinMeeting(io, socket));
        socket.on('s:msg:new', onMessage(io, socket));
        socket.on('audioStream', (audioData) => {
            socket.broadcast.emit('audioStream', audioData);
        });
        socket.on('offer', (offer) => {
            console.log('Offer received:', offer);
            socket.broadcast.emit('offer', offer);
        });

        socket.on('answer', (answer) => {
            console.log('Answer received:', answer);
            socket.broadcast.emit('answer', answer);
        });

        socket.on('candidate', (candidate) => {
            console.log('Candidate received:', candidate);
            socket.broadcast.emit('candidate', candidate);
        });
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id)
        })
    }
}