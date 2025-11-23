# music-gpt-create-page

## Quick overview
This project is a Next.js frontend that communicates with a dedicated WebSocket (socket.io) server. Route Handlers (app/api/...) are used for HTTP endpoints and server-side logic; realtime messaging is handled by the custom socket.io server. Client state is managed with Zustand and styling is handled via Tailwind

## Features
- Next.js app using app/ and route handlers
- Realtime messaging with socket.io
- Separate custom socket.io server (Node)
- Lightweight client state with Zustand
- Pluggable styling strategy

## Folder structure (suggested)
- app/                      — Next.js App Router pages + components
  - api/                    — Route Handlers (app/api/...)
- components/               — React components
- styles/                   — CSS / Tailwind config
- lib/                      — shared utilities
- store/                    — Zustand stores
- server/                   — custom socket.io server (Node)
- socket-server.ts          — socket.io server entry
- package.json

## Environment
Example env vars (add as .env.local for Next.js and .env for the server as needed)
- NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
- PORT=3000
- SOCKET_PORT=4000

## Installation
This project by default uses pnpm
Why pnpm:
For its speed, disk space efficiency, and strict dependency handling...( or Search Google haha :D)
To install pnpm:
  - https://pnpm.io/installation
1. Install dependencies
   - pnpm install

## Development
Run Next.js app:
- pnpm dev
uses a process runner to start both server

## Socket.io server (server/index.js) — minimal sketch
- Run a socket.io server on WS_PORT
- Handle connections, rooms, broadcasts, and custom events
- Optionally authenticate sockets via query or JWT

## Client integration (high level)
- Use socket.io-client to connect:
  - connect to NEXT_PUBLIC_WS_URL
  - emit and listen for events
- Uses Zustand to keep minimal UI state (connected user, messages, room)
Example store:
```js
import create from 'zustand';

export const useStore = create((set) => ({
  connected: false,
  messages: [],
  setConnected: (v) => set({ connected: v }),
  addMessage: (m) => set((s) => ({ messages: [...s.messages, m] }))
}));
```

## Troubleshooting
- CORS errors: ensure server allows origin and correct path
- Connection refused: verify WS_PORT and NEXT_PUBLIC_WS_URL
- State desync: reconcile via server-side events and refresh logic
