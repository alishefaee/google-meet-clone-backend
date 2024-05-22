import { Server } from "socket.io";

export function logRoomDetails(io: Server, roomId: string, action: string) {
    const room = io.sockets.adapter.rooms.get(roomId);
    if (room) {
        console.log(`Members in room ${roomId} after ${action}:`, Array.from(room.keys()));
    } else {
        console.log(`Room ${roomId} does not exist after ${action}.`);
    }

    // Log all rooms and their members
    console.log(`All rooms after ${action}:`);
    io.sockets.adapter.rooms.forEach((members, room) => {
        console.log(`Room ${room}: Members ${Array.from(members.keys())}`);
    });
}
