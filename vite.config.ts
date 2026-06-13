import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    VitePWA({
      registerType: 'prompt',
      injectRegister: 'auto',

      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'masked-icon.svg'
      ],

      manifest: {
        id: '/',
        name: 'جفت تاس',
        short_name: 'جفت تاس',
        description: 'جفت تاس',
        theme_color: '#f0f2f5',
        background_color: '#f0f2f5',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: false
      }
    })
  ],
})