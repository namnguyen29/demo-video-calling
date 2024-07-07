import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@app-features": path.resolve(__dirname, "./src/app/features"),
      "@app-containers": path.resolve(__dirname, "./src/app/containers"),
      "@app-core": path.resolve(__dirname, "./src/app/core"),
      "@app-environments": path.resolve(__dirname, "./src/environments"),
      "@app-shared": path.resolve(__dirname, "./src/app/shared"),
      "@app-assets": path.resolve(__dirname, "./src/assets"),
    },
  },
});
