import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import crypto from "node:crypto";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

let history = []; // simple in-memory message history (volatile)

io.on("connection", (socket) => {
  // send chat history on join
  socket.emit("history", history);

  socket.on("message", (msg) => {
    const payload = {
      id: crypto.randomUUID(),
      text: String(msg?.text ?? ""),
      user: String(msg?.user ?? "Anon"),
      ts: Date.now()
    };
    history.push(payload);
    // broadcast to all (including sender)
    io.emit("message", payload);
  });
});

app.get("/health", (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Socket.IO server on http://localhost:${PORT}`);
});
