import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/dsa-visualizer/',
  resolve: { tsconfigPaths: true },
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/scheduler') || id.includes('node_modules/react-router')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/@chakra-ui') || id.includes('node_modules/@emotion') || id.includes('node_modules/framer-motion') || id.includes('node_modules/zustand')) {
            return 'vendor-ui'
          }
          if (id.includes('node_modules/react-syntax-highlighter') || id.includes('node_modules/highlight') || id.includes('node_modules/prism')) {
            return 'vendor-code'
          }
          if (id.includes('node_modules/lucide-react') || id.includes('node_modules/react-icons')) {
            return 'vendor-icons'
          }
        },
      },
    },
  },
})
