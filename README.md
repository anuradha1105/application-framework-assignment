# Enterprise Software Platforms — Chat Application

## Project Overview

This project demonstrates a **real-time chat application** implemented twice using two different full-stack frameworks, one JavaScript-based and one enterprise Java + Angular–based.  
Each version allows multiple browser sessions to send and receive messages in real time.

> **Assignment Goal:**  
> Build a browser-based “chat” app backed by an application server, implemented twice using different frameworks.  
> Reflect on differences in architecture, strengths, weaknesses, and the MVC mapping of each.

---

## Versions Summary

| Version | Frontend | Backend | WebSocket Tech | Port | Description |
|----------|-----------|----------|----------------|------|--------------|
| **1** | React | Node.js (Express + Socket.IO) | Socket.IO | 3000 (backend) / 5173 (frontend) | Lightweight, JavaScript-only, fast to prototype |
| **2** | Angular | Spring Boot (STOMP + SockJS) | STOMP over WebSocket | 8081 (backend) / 4200 (frontend) | Enterprise-style, strongly typed, message broker-based |

---

## Repository Structure

```
chat-project
│
├── chat-react-socketio/
│   ├── server/         # Node.js + Express + Socket.IO
│   └── client/         # React frontend
│
├── chat-angular-spring/
│   ├── server/         # Spring Boot backend
│   └── client-app/     # Angular frontend
│
├── README.md           # Main documentation (this file)
└── WRITEUP.md          # One-page report comparing frameworks and MVC mapping
```

---

## Requirements Recap

- Browser-based chat UI  
- Messages instantly reflected across sessions  
- Two different framework stacks  
- Functioning code in GitHub  
- Clear run instructions (local/cloud)  
- One-page reflection on frameworks and MVC mapping  

---

# VERSION 1: React + Node.js + Socket.IO

### Overview
This version uses Socket.IO for WebSocket-style bidirectional communication between the client and server.

Each connected client receives updates in real-time when another user sends a message.

---

### How to Run

#### **Terminal 1 – Start Backend**
```bash
cd "chat-react-socketio/server"
npm install
npm start
```
- Server starts on `http://localhost:3000`
- Console: `Server running on port 3000`

#### **Terminal 2 – Start Frontend**
```bash
cd "chat-react-socketio/client"
npm install
npm run dev
```
- Open the printed URL (e.g., `http://localhost:5173/`)

#### **Test**
1. Open two tabs at `http://localhost:5173/`
2. Type messages in one tab — they appear instantly in both

---

### Screenshot


<img width="488" height="320" alt="0" src="https://github.com/user-attachments/assets/04cd206e-d5bc-48ee-b617-a9f626d267ed" />



<img width="1676" height="892" alt="00" src="https://github.com/user-attachments/assets/def6908f-f755-45c6-985f-447bfa550089" />



<img width="1676" height="874" alt="000" src="https://github.com/user-attachments/assets/c973989d-00f0-49a0-ac7a-a72d1a616012" />



---

### Architecture

**Model (M)** — Message object `{ user, text, timestamp }`  
**View (V)** — React components rendering chat UI  
**Controller (C)** — Socket.IO event handlers (`socket.on('chatMessage')`)  

---

### Strengths
- Extremely fast setup & testing  
- Unified language (JavaScript) across frontend and backend  
- Great developer productivity  

### Weaknesses
- No strict structure or typing  
- Harder to scale for enterprise teams  

---

# VERSION 2: Angular + Spring Boot (STOMP over WebSocket/SockJS)

### Overview
This version uses Spring Boot as the backend and Angular as the frontend.  
Communication uses STOMP over WebSockets with a built-in message broker for broadcasting.

---

### How to Run

#### **Terminal 1 – Start Spring Boot Backend**
```bash
cd "chat-angular-spring/server"
mvn clean spring-boot:run
```
Expected log:
```
Tomcat started on port 8081
Started ChatApplication
```

> If port 8081 is busy:
> ```bash
> lsof -i :8081
> kill -9 <PID>
> mvn spring-boot:run
> ```

#### **Terminal 2 – Start Angular Frontend**
```bash
cd "chat-angular-spring/client-app"
nvm use 20
npm install
ng serve --port 4200
```

Expected output:
```
Compiled successfully.
Local: http://localhost:4200/
```

#### **Test**
1. Open two tabs: http://localhost:4200/
2. Enter nickname and send message  
3. The message should appear in both tabs instantly  

---

### Troubleshooting Notes
- `global is not defined` in browser console → add global polyfill to `index.html`
- `NG0908: Angular requires Zone.js` → run `npm install zone.js` and import it in `main.ts`
- Spring Boot showing Whitelabel 404 is normal — it only handles WebSocket routes (`/ws`)

---

### Screenshot 



<img width="746" height="313" alt="1" src="https://github.com/user-attachments/assets/b240c878-8fb6-40da-b986-f3fce45c93cf" />




<img width="806" height="292" alt="11" src="https://github.com/user-attachments/assets/91814ac2-cb3c-47e1-a78b-553d08482227" />




<img width="1483" height="766" alt="111" src="https://github.com/user-attachments/assets/d4b77915-05fc-493b-b6db-b3957eb9fbd6" />




<img width="1586" height="831" alt="1111" src="https://github.com/user-attachments/assets/a9d76ddb-401f-4c5c-97a0-bd8da94c253e" />




---

### Architecture

**Model (M)** —  
- Backend: `Message.java` (`user`, `text`, `ts`)  
- Frontend: `ChatMessage` interface  

**Controller (C)** —  
- Spring Boot `ChatController.java` using  
  `@MessageMapping("/chat")` and `@SendTo("/topic/messages")`

**View (V)** —  
- Angular template `app.html` with `*ngFor` to render message list  

---

### Strengths
- Clear MVC separation  
- Scalable enterprise architecture  
- STOMP broker supports multi-user chat rooms  
- Strong typing & annotation-driven backend  

### Weaknesses
- Heavier setup (Java + Angular + build systems)  
- Requires polyfills and dependency configuration for modern Angular  

---

# FRAMEWORK DIFFERENCES

| Aspect | React + Node.js | Angular + Spring Boot |
|--------|------------------|-----------------------|
| **Language** | JavaScript everywhere | TypeScript + Java |
| **Setup Speed** | Very fast | Slower, more configuration |
| **Architecture** | Flat, lightweight | Layered (MVC + Broker) |
| **Communication** | Socket.IO direct emit/broadcast | STOMP publish/subscribe |
| **Typing** | Dynamic | Strongly typed |
| **Learning Curve** | Easy | Steeper (Spring + Angular CLI) |
| **Scalability** | Best for small/medium projects | Enterprise-grade |
| **UI Rendering** | React components | Angular templates with data-binding |

---

# Key Takeaways

- React/Node: minimal ceremony, instant feedback  
- Angular/Spring: full enterprise pipeline (DTOs, controllers, brokers)  
- Frameworks shape the way you think about apps:  
  - React feels event-driven & flexible  
  - Spring Boot feels structured & disciplined  

---


