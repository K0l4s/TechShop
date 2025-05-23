import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Mở server để truy cập từ các thiết bị trong cùng mạng LAN
    port: 5000, // Thay đổi cổng nếu cần thiết
  },
});
