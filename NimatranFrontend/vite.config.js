import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Default output directory for build
  },
  server: {
    port: 3000, // Local dev port
  },
  preview: {
    port: 3000,
  },
});
