import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],
  server: {
    allowedHosts: ["0d5f-125-161-27-172.ngrok-free.app"],
    // hmr: {
    //   host: "https://8b6e-125-161-27-172.ngrok-free.app",
    //   protocol: "wss",
    //   port: 443,
    // },
  },
});
