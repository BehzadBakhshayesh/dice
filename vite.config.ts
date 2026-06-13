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
        id: '/dice/',
        name: 'جفت تاس',
        short_name: 'جفت تاس',
        description: 'جفت تاس',
        theme_color: '#f0f2f5',
        background_color: '#f0f2f5',
        display: 'standalone',
        start_url: '/dice/',
        scope: '/dice/',
        icons: [
          {
            src: 'pwa-32x32.png',
            sizes: '32x32',
            type: 'image/png'
          },
          {
            src: 'pwa-48x48.png',
            sizes: '48x48',
            type: 'image/png'
          },
          {
            src: 'pwa-72x72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: 'pwa-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: 'pwa-256x256.png',
            sizes: '256x256',
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