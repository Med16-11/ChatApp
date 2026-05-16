
<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/9872702e-45ec-4d52-b8c2-f2b7c4182f6e" />
# ChatApp

A full-stack real-time chat application built with **TypeScript** end-to-end — React on the frontend and Node.js + Express + Socket.IO on the backend.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Architecture](#architecture)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment variables](#environment-variables)
  - [Running locally](#running-locally)
- [API overview](#api-overview)
- [Socket events](#socket-events)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Real-time messaging** — instant message delivery via WebSockets (Socket.IO)
- **User authentication** — JWT-based login and registration with password hashing (bcrypt)
- **Conversations & rooms** — create and join chat rooms or start private one-to-one conversations
- **Online presence** — see which users are currently active
- **Typing indicators** — live "someone is typing…" feedback
- **Message history** — previous messages loaded from the database on joining a conversation
---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Redux (state), Axios (HTTP), Socket.IO client |
| Backend | Node.js, Express, TypeScript, Socket.IO server |
| Auth | JSON Web Tokens (JWT), bcrypt |
| Database |  MongoDB (via Mongoose) |
| Session / presence | Redis |
| Build tools | Vite (frontend), tsc (backend) |

---

## Project structure

```
ChatApp/
├── frontend/               # React + TypeScript SPA
│   ├── src/
│   │   ├── components/     # Reusable UI components (MessageList, Sidebar, …)
│   │   ├── pages/          # Route-level views (Login, Chat, Profile)
│   │   ├── store/          # Redux store, slices, and socket middleware
│   │   ├── socket/         # SocketFactory — wraps socket.io-client
│   │   ├── services/       # Axios API clients
│   │   ├── types/          # Shared TypeScript interfaces
│   │   └── App.tsx
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                # Node.js + Express + Socket.IO API
│   ├── src/
│   │   ├── routes/         # Express route definitions
│   │   ├── controllers/    # Request handlers (users, messages, rooms)
│   │   ├── middleware/     # Auth (JWT), CORS, error handling
│   │   ├── models/         # DB models / schemas
│   │   ├── socket/         # Socket.IO event handlers
│   │   ├── services/       # Business logic (auth, messaging)
│   │   └── server.ts       # Entry point
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

## Architecture

The app follows a standard client–server model with two communication channels:

```
┌─────────────────────────────────────┐
│           Frontend (React)          │
│  Pages · Components · Redux store   │
│  Axios (REST)   SocketFactory (WS)  │
└───────┬─────────────────────┬───────┘
        │  HTTP REST          │  WebSocket
        │  (auth, history)    │  (messages, presence)
┌───────▼─────────────────────▼───────┐
│           Backend (Express)         │
│  REST API server   Socket.IO server │
│  Controllers       Event handlers   │
│  Auth middleware   JWT validation   │
└───────────────────┬─────────────────┘
                    │  ORM / queries
              ┌─────▼─────┐
              │ Database  │
              │ users     │
              │ messages  │
              │ rooms     │
              └───────────┘
```

REST endpoints handle stateless operations — login, registration, loading message history, and listing users. Socket.IO handles everything that needs to be pushed in real time — new messages, typing events, and presence updates.

---

## Getting started

### Prerequisites

- Node.js 18 or later
- npm 9+ (or pnpm / yarn)
- A running PostgreSQL or MongoDB instance
- (Optional) Redis for session / presence storage

### Installation

Clone the repository and install dependencies for both workspaces:

```bash
git clone https://github.com/Med16-11/ChatApp.git
cd ChatApp

# install backend dependencies
cd backend && npm install

# install frontend dependencies
cd ../frontend && npm install
```

## API overview

All REST endpoints are prefixed with `/api`.

| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Create a new account | No |
| `POST` | `/api/auth/login` | Log in and receive a JWT | No |
| `GET` | `/api/users` | List all users | Yes |
| `GET` | `/api/users/:id` | Get a user's profile | Yes |
| `GET` | `/api/conversations` | List current user's conversations | Yes |
| `GET` | `/api/conversations/:id/messages` | Fetch message history | Yes |
| `POST` | `/api/conversations` | Start a new conversation | Yes |

Protected endpoints expect the token in the `Authorization` header:

```
Authorization: Bearer <token>
```

---

## Socket events

The Socket.IO server authenticates every connection through a middleware that validates the JWT before the handshake completes.

### Client → server

| Event | Payload | Description |
|---|---|---|
| `join_room` | `{ conversationId: string }` | Subscribe to a conversation room |
| `leave_room` | `{ conversationId: string }` | Unsubscribe from a room |
| `send_message` | `{ conversationId, content }` | Send a message |
| `typing_start` | `{ conversationId: string }` | Notify others the user is typing |
| `typing_stop` | `{ conversationId: string }` | Notify others the user stopped typing |

### Server → client

| Event | Payload | Description |
|---|---|---|
| `new_message` | `Message` | A new message arrived in a room |
| `user_joined` | `{ userId, conversationId }` | Another user joined the room |
| `user_left` | `{ userId, conversationId }` | Another user left the room |
| `typing` | `{ userId, conversationId }` | A user is currently typing |
| `presence_update` | `{ userId, online: boolean }` | A user came online or went offline |

---

## Contributing

Contributions are welcome. Please open an issue to discuss what you'd like to change before submitting a pull request.

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a pull request

Please follow the existing TypeScript conventions and make sure the project builds without errors before opening a PR.

---
