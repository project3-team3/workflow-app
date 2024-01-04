import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Define PWA settings
    VitePWA({
      manifest: {
        name: "Workflow",
        short_name: "Workflow",
        theme_color: "#FAF9F6",
        background_color: "#00C2CB",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/your-api-domain\.com\/graphql/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
            },
          },
          {
            urlPattern: /\.(mp3|ogg)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "audio-cache",
            },
          },
          {
            urlPattern: /\.(css|woff|woff2|ttf|otf)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'css-font-cache',
            },
          },
          {
            urlPattern: /\.js$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'js-cache',
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/icon/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'material-icons-cache',
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/graphql": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
