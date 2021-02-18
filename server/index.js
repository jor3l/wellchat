import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";

import { Server } from "http";
import { Server as Socket } from "socket.io";

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = new Server(app);
const io = new Socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let messages = [];

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    messages.push(data);
    if (messages.length > 20) messages.shift();
    socket.broadcast.emit("message", data);
  });
});

app.route("/api/messages").get(async (req, res) => {
  res.json(messages);
});

server.listen(process.env.PORT || 3000, (err) => {
  if (err) process.exit(0);
  console.log(`> Server on http://localhost:${process.env.PORT || 3000}`);
});
