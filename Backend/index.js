import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth.routes.js";
import canvasRoutes from "./routes/canvas.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import Canvas from "./models/canvas.model.js";
import healthRoutes from "./routes/health.routes.js";  
import { metricsMiddleware, metricsHandler } from "./middlewares/metrics.middleware.js"; 


const app = express();
const CLIENT_URL = process.env.CLIENT_URL;
/* ---------------- middleware ---------------- */
app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(metricsMiddleware);      

/* ---------------- routes ---------------- */
app.use("/api/auth", authRoutes);
app.use("/api/canvas", canvasRoutes);
app.use("/api/health", healthRoutes);        
app.get("/metrics", metricsHandler);
/* ---------------- error handler ---------------- */
app.use(errorHandler);

/* ---------------- http server ---------------- */
const server = http.createServer(app);

/* ---------------- socket.io ---------------- */
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    credentials: true,
  },
});

/*SOCKET AUTH MIDDLEWARE*/
io.use((socket, next) => {
  try {
    const cookie = socket.handshake.headers.cookie;
    if (!cookie) throw new Error("No cookie");

    const token = cookie
      .split("; ")
      .find((c) => c.startsWith("accessToken="))
      ?.split("=")[1];

    if (!token) throw new Error("No token");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded; //{ id, email }

    next();
  } catch (err) {
    next(new Error("Unauthorized socket"));
  }
});

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id, "user:", socket.user.id);

  /* -------- join canvas room (secure) -------- */
  socket.on("join-canvas", async ({ canvasId }) => {
    const canvas = await Canvas.findById(canvasId);
    if (!canvas) return;

    const isOwner = canvas.owner.toString() === socket.user.id;
    const isShared = canvas.sharedWith.some(
      (id) => id.toString() === socket.user.id
    );

    if(!isOwner && !isShared){
      console.log("❌ Unauthorized canvas access");
      return;
    }

    socket.join(`canvas:${canvasId}`);
    console.log(`📌 ${socket.id} joined canvas:${canvasId}`);

    //send latest canvas state
    socket.emit("canvas:init", canvas.elements);
  });

  /* -------- realtime updates -------- */
  socket.on("canvas-update", async ({ canvasId, elements }) => {
    // broadcast to others
    socket.to(`canvas:${canvasId}`).emit("canvas-update", elements);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

export default server;
