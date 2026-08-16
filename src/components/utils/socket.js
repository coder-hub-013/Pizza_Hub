import { io } from "socket.io-client";

const socket = io("https://pizza-hub-backend-10ya.onrender.com", {
    withCredentials: true,
});

export default socket;
