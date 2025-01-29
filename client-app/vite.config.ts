import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  // Changed the port to 3000 instead of the random default one
  server: {
    port: 3000
  },
  plugins: [react()],
})
