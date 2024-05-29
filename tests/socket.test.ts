import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { createServer } from "node:http";
import { type AddressInfo } from "node:net";
import { io as ioc, type Socket as ClientSocket } from "socket.io-client";
import { Server, type Socket as ServerSocket } from "socket.io";
import dotenv from "dotenv"

dotenv.config({ path: '.env.example' })

function waitFor(socket: ServerSocket | ClientSocket, event: string) {
    return new Promise((resolve) => {
        socket.once(event, resolve);
    });
}

describe("my awesome project", () => {
    let io: Server, serverSocket: ServerSocket, clientSocket: ClientSocket;
    const port = process.env.PORT || 4000

    beforeAll(() => {
        return new Promise((resolve) => {
            const httpServer = createServer();
            io = new Server(httpServer);
            httpServer.listen(port, () => {
                // const port = (httpServer.address() as AddressInfo).port;
                console.log('port:', port)
                clientSocket = ioc(`http://localhost:${port}`);
                io.on("connection", (socket) => {
                    serverSocket = socket;
                });
                clientSocket.on("connect", resolve);
            });
        });
    });

    afterAll(() => {
        io.close();
        clientSocket.disconnect();
    });

    it("should work", () => {
        return new Promise((resolve) => {
            clientSocket.on("hello", (arg) => {
                expect(arg).toEqual("world");
                resolve(undefined);
            });
            serverSocket.emit("hello", "world");
        });
    });

    it("should work with an acknowledgement", () => {
        return new Promise((resolve) => {
            serverSocket.on("hi", (cb) => {
                cb("hola");
            });
            clientSocket.emit("hi", (arg:any) => {
                expect(arg).toEqual("hola");
                resolve(undefined);
            });
        });
    });

    it("should work with emitWithAck()", async () => {
        serverSocket.on("foo", (cb) => {
            cb("bar");
        });
        const result = await clientSocket.emitWithAck("foo");
        expect(result).toEqual("bar");
    });

    it("should work with waitFor()", () => {
        clientSocket.emit("baz");

        return waitFor(serverSocket, "baz");
    });
});