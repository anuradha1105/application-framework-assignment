# One-Page Write-up (Template)

**Title:** Real-time Chat — Comparing Frameworks

**Goal:** Build a tiny browser chat twice to compare how frameworks shape architecture and developer experience.

**Architecture (both):**
- Transport: WebSocket-based broadcast from server to all clients.
- State: In-memory (ephemeral), no database.

**MVC (React + Socket.IO)**
- **Model:** message objects on the server; local list on client.
- **View:** React components rendering the list and inputs.
- **Controller:** Socket event handlers (client emits `message`, server `io.emit`).
- **Why:** Event-driven style maps naturally to Socket.IO; React is fast for dynamic lists.

**MVC (Angular + Spring)**
- **Model:** `Message` record (Spring) / `ChatMessage` interface (Angular).
- **View:** Angular template & data binding.
- **Controller:** `@MessageMapping("/chat")` → `@SendTo("/topic/messages")`; Angular service encapsulates STOMP.
- **Why:** Spring annotations formalize routing; Angular DI organizes client logic.

**Strengths vs Weaknesses**
- React+Socket.IO: fastest bootstrap, JS end-to-end; less structure out-of-the-box.
- Angular+Spring: strong conventions, enterprise-friendly; more setup and tooling.

**Limitations**
- No auth, no persistence, single-node broadcast only.

**Next steps**
- Add rooms, persistence (Redis/DB), auth, and deployment scripts.
