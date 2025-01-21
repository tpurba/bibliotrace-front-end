import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    }
  },
  base: '/dummy-frunt-end',
})
