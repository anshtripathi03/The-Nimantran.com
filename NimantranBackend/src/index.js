import https from 'https';
import fs from 'fs';
import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './dB/db.connect.js';

dotenv.config({
  path: '../.env',
});

const PORT = process.env.PORT || 1000;

// Load SSL cert and key (self-signed for localhost)
const sslOptions = {
  key: fs.readFileSync('./ssl/key.pem'),
  cert: fs.readFileSync('./ssl/cert.pem'),
};

connectDB()
  .then(() => {
    https.createServer(sslOptions, app).listen(PORT, () => {
      console.log(`🚀 HTTPS Server running on https://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to DB:', err);
  });
