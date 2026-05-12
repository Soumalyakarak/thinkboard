# ✏️ Thinkboard

> A real-time collaborative whiteboard for visual thinkers — free & open source.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-thinkboard--chi.vercel.app-6c63ff?style=for-the-badge)](https://thinkboard-chi.vercel.app)
[![Backend](https://img.shields.io/badge/API-Health%20Check-46E3B7?style=for-the-badge)](https://thinkboard-9oo9.onrender.com/api/health)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

---

## ✨ Features

- 🎨 Infinite canvas with drawing tools
- 🤝 Real-time collaboration via WebSockets
- 🔐 JWT authentication with HTTP-only cookies
- 📧 OTP-based password reset via email
- 🗂️ Create, share, and delete canvases
- 📊 Prometheus metrics + Grafana Cloud monitoring
- 🚀 CI/CD pipeline with GitHub Actions

---

## 🛠️ Tech Stack

**Frontend** — React.js, Socket.io Client, Tailwind CSS, deployed on Vercel

**Backend** — Node.js, Express, Socket.io, MongoDB, JWT, Nodemailer, deployed on Render

**DevOps** — GitHub Actions, Prometheus, Grafana Cloud, MongoDB Atlas

---

## 🏗️ Architecture

```
React (Vercel) ──REST + WebSocket──► Express + Socket.io (Render)
                                              │
                                       MongoDB Atlas
                                              │
                                    Prometheus ──► Grafana Cloud
```

---

## 🌐 Live

| | Link |
|---|---|
| 🖥️ App | [thinkboard-chi.vercel.app](https://thinkboard-chi.vercel.app) |
| ⚙️ API Health | [/api/health](https://thinkboard-9oo9.onrender.com/api/health) |
| 📊 Metrics | [/metrics](https://thinkboard-9oo9.onrender.com/metrics) |

---

## 🚀 Run Locally

### Prerequisites

- Node.js v18+
- MongoDB Atlas URI (or local MongoDB)
- Gmail account with App Password (for OTP emails)

### 1. Clone the repository

```bash
git clone https://github.com/Soumalyakarak/thinkboard.git
cd thinkboard
```

### 2. Backend setup

```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

Start the backend server:

```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### 3. Frontend setup

```bash
cd ../Frontend
npm install
```

Create a `.env` file inside `Frontend/`:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
```

Start the frontend:

```bash
npm start
```

Frontend runs on `http://localhost:3000`

---

## 🔄 CI/CD Pipeline

Every push to `main` triggers GitHub Actions:

- **Backend changes** → installs dependencies → triggers Render deploy
- **Frontend changes** → installs dependencies → builds → deploys to Vercel

---

## 📊 Monitoring

Metrics are pushed to **Grafana Cloud** every 15 seconds via `prom-client`, tracking HTTP requests, memory usage, CPU, and event loop latency.

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.

---

## 👨‍💻 Author

**Soumalya Karak**

[![GitHub](https://img.shields.io/badge/GitHub-Soumalyakarak-181717?style=flat&logo=github)](https://github.com/Soumalyakarak)