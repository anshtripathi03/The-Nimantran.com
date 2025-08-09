import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/TheNimantran.com/',

  server: {
    https: {
      key: fs.readFileSync('./ssl/key.pem'),
      cert: fs.readFileSync('./ssl/cert.pem'),
    },
    proxy: {
      '/api': {
        target: 'https://newlive.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
