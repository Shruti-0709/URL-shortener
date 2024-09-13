import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Import path for handling directory paths

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],  // Add the React plugin to enable React support
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias '@' to the src directory (optional)
    },
  },
  build: {
    outDir: 'dist',  // Build output directory, default is 'dist'
  },
  server: {
    port: 5173, // Ensure the server is running on Vite's default port for development
    proxy: {
      // Proxy API requests to the Express backend (running on port 5000)
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
