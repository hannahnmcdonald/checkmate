import { defineConfig } from "vite";
import { tamaguiPlugin } from "@tamagui/vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";

// Allow shared imports from /packages/*
export default defineConfig({
  plugins: [
    tamaguiPlugin({
      config: "../../packages/theme/tamagui.config.ts", // path to your config
    }),
    react(),
  ],
  resolve: {
    alias: {
      react: path.resolve(__dirname, "../../node_modules/react"),
      "react-dom": path.resolve(__dirname, "../../node_modules/react-dom"),
      "@checkmate/screens": path.resolve(__dirname, "../../packages/screens"),
      "@checkmate/theme": path.resolve(__dirname, "../../packages/theme"),
      "@checkmate/ui": path.resolve(__dirname, "../../packages/ui"),
      "@checkmate/hooks": path.resolve(__dirname, "../../packages/hooks"),
      "@checkmate/store": path.resolve(__dirname, "../../packages/store"),
      "@checkmate/api": path.resolve(__dirname, "../../packages/api"),
      "@checkmate/types": path.resolve(__dirname, "../../packages/types"),
    },
  },
  server: {
    // Forwards any API requests during development to our backend server.
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
    fs: {
      allow: ["..", path.resolve(__dirname, "../../")],
    },
  },
});
