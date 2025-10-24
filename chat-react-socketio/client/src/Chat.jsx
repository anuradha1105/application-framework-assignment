import React, { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:4000";

export default function Chat() {
  const socket = useMemo(() => io(SERVER_URL, { transports: ["websocket"] }), []);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(() => "User" + Math.floor(Math.random()*1000));
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    socket.on("history", (hist) => setMessages(hist));
    socket.on("message", (payload) => setMessages((m) => [...m, payload]));
    return () => socket.disconnect();
  }, [socket]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const send = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    socket.emit("message", { text, user });
    setText("");
  };

  return (
    <div className="card">
      <div className="row">
        <label>Nickname</label>
        <input value={user} onChange={(e) => setUser(e.target.value)} />
      </div>

      <div className="chatbox" aria-live="polite">
        {messages.map(m => (
          <div key={m.id} className="msg">
            <div className="meta"><b>{m.user}</b> <span>{new Date(m.ts).toLocaleTimeString()}</span></div>
            <div>{m.text}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={send} className="row">
        <input
          placeholder="Type a message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
