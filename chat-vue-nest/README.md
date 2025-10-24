# chat-vue-nest

This folder contains a small chat application implemented with Vue 3 (client) and NestJS (server).

Structure:
- client: Vite + Vue 3 frontend
- server: NestJS WebSocket gateway (socket.io)

Quick start (macOS / zsh):

1) Install and run the server

```bash
cd chat-vue-nest/server
npm install
npm run start:dev
```

2) Install and run the client

```bash
cd chat-vue-nest/client
npm install
npm run dev
```

Open the client in two browser tabs (Vite will print the URL, typically http://localhost:5173) and test real-time messaging.

Notes:
- The UI and styles are adapted from the Angular app to keep the same look and layout.
- The backend uses socket.io and emits/receives `message` events with payload { user, text, ts }.
