import { io } from "socket.io-client";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

export const socket = io(SOCKET_URL,{
  withCredentials: true,
  autoConnect: false, //important (we’ll control when to connect)
});
