import socketIOClient from "socket.io-client";
import { io } from "socket.io-client";
const serverEndpoint = "http://127.0.0.1:8080";

export const socket = io(serverEndpoint, {
    transports: ['websocket']
});