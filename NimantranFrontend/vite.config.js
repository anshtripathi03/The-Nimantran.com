import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // same as --host
 
    port: 3000
  },
  preview: {
    port: 3000
  }
})
