import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configura la base URL para una aplicación de enrutamiento de React
  base: '/',
  build: {
    outDir: 'dist',  // Directorio donde se almacenan los archivos construidos
  },
})
