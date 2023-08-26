import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object

const URL = "http://192.168.1.3:3000";

export const socket = io(URL, {
  autoConnect: false,
});
