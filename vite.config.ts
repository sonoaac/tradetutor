import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const clientRoot = path.resolve(import.meta.dirname, "client");

export default defineConfig({
  plugins: [react()],
  root: clientRoot,
  resolve: {
    alias: {
      "@": path.resolve(clientRoot, "src"),
    },
  },
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
