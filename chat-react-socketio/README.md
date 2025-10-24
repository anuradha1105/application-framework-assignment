# React + Express + Socket.IO Chat

## Run locally
```bash
# Server
cd server
npm i
npm run start  # http://localhost:4000

# Client
cd ../client
npm i
npm run dev    # http://localhost:5173
```
If your server runs elsewhere, build the client with:
```bash
VITE_SERVER_URL="https://your-server-host" npm run build
npm run preview
```
