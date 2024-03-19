import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
  },
  plugins: [
    VitePWA({
      includeAssets: ['./assets/images/logo.png'],
      manifest: {
        name: 'iContact Card',
        short_name: 'Contact Card',
        description: 'iContact Card description',
        theme_color: '#ffffff',
        icons: [
          {
            src: './assets/images/logo.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './assets/images/logo.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\.(js|css)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'assets-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
