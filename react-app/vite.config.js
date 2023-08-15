import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,  // Needed for port mapping
    strictPort: true,
    port: 5173,  // can be changed to whatever port
  }
});
