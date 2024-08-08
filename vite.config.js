import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  compilerOptions: {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@src': '/src',
      '@api': '/src/api',
      '@components': '/src/components',
      '@utils': '/src/utils',
    },
  },
})
