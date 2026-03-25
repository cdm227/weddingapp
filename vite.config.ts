import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ command }) => {
  // In dev (Codespaces), use "/" so routes/assets work no matter what URL path you opened.
  // In production (GitHub Pages project site), use "/weddingapp/".
  const base = command === "serve" ? "/" : "/weddingapp/";

  return {
    base,
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
