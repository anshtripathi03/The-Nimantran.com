import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "fs";
import https from "https";
import router from "./routes/user.routes.js";

const app = express();

// ===== CORS CONFIG =====
const FRONTEND_URL = "https://newlive-99.onrender.com";

const corsOptions = {
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// ===== BODY PARSER =====
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// ===== STATIC FILES =====
app.use(express.static("public"));

// ===== COOKIE PARSER =====
app.use(cookieParser());

// ===== ROUTES =====
app.use("/api", router);

// ===== ERROR HANDLER =====
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// ===== HTTPS SERVER =====


export default app;
