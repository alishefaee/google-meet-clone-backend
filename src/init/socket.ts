import { Server } from "socket.io";
import http from "http";
import { authSocketMid } from '../middlewares/auth.middleware';
import { logRoomDetails } from "../utils/function";

export function socketServer(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: "*"
    },

  });

  io.use(authSocketMid);
  io.on("connection", (socket) => {
    console.log('client connected:', socket.id);

    socket.on('create-meeting', (data, fn) => {
      console.log('create meeting:', data);
      const roomId = data.meetingId.toString();
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room ${roomId} after create.`);
      logRoomDetails(io, roomId, 'create');
      fn();
      console.log('----------------------------------')
    });

    socket.on('join-meeting', (data, fn) => {
      console.log('join meeting:', data);
      const roomId = data.meetingId.toString();
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room ${roomId} after joining.`);
      logRoomDetails(io, roomId, 'joining');
      io.to(roomId).emit('new-member', { username: socket.handshake.auth.username });
      fn();
      console.log('----------------------------------')
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id)
    })
  });

  return io;
}

