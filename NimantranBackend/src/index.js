import https from "https";
import fs from "fs";
import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./dB/db.connect.js";


import path from "path";
import { fileURLToPath } from "url";

dotenv.config({
  path: "../.env",
});

const PORT = process.env.PORT || 1000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, "../ssl/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "../ssl/cert.pem")),
};
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 HTTPS Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB:", err);
  });
