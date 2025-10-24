import React from "react";
import Chat from "./Chat.jsx";

export default function App() {
  return (
    <div className="wrap">
      <h1>Mini Chat (React + Socket.IO)</h1>
      <Chat />
      <footer>
        <small>Open this page in two browser windows to test real-time sync.</small>
      </footer>
    </div>
  );
}
