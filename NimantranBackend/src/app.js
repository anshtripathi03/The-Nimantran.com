import express, { urlencoded } from "express"
import multer from "multer";
import cors from "cors"
import cookieParser from "cookie-parser";
import router from "./routes/user.routes.js";
import https from "https"
import fs from "fs"
const app = express();
const sslServer = https.createServer({
  key: fs.readFileSync('./ssl/key.pem'),
  cert: fs.readFileSync('./ssl/cert.pem'),
}, app);


app.use(cors({
  origin: "https://newlive-12345.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);
app.use(express.static("public"));

app.use(cookieParser())
app.use("/api",router)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});


export default app;