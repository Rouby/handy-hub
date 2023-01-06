import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  plugins: [react({})],
  build: {
    sourcemap: true,
  },
  server: {
    proxy: {
      "/trpc": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
}));
