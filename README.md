# Enterprise Chat — Two Frameworks (Mono-repo)

This mono-repo contains two minimal real-time chat apps to compare frameworks for your assignment.

- `chat-react-socketio/` — React + Express + Socket.IO
- `chat-angular-spring/` — Angular + Spring Boot + STOMP

## Quickstart

### Option 1: React + Socket.IO (fastest path)
```bash
cd chat-react-socketio/server && npm i && npm run start
# in another terminal
cd ../client && npm i && npm run dev
# open http://localhost:5173
```

### Option 2: Angular + Spring
```bash
# Spring
cd chat-angular-spring/server && mvn spring-boot:run
# Angular
cd ../client && npm i -g @angular/cli && npm i && ng serve --port 4200
# open http://localhost:4200
```

## Notes
- Both implementations broadcast messages to all connected clients.
- No persistence/auth; in-memory only (kept intentionally simple).
