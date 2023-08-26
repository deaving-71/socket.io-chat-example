import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

type Message = { id: string; user: string; content: string };

io.on("connection", (socket) => {
  console.log(`A user connected with id: ${socket.id}`);

  socket.on("send-message", (message: Message) => {
    console.log(message);
    io.emit("receive-message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

httpServer.listen(3000, () =>
  console.log(
    "Server running on http://localhost:3000 or http://192.168.1.3:3000"
  )
);
