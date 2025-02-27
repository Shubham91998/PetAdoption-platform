import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/",  // Ensures proper asset loading
  server: {
    historyApiFallback: true,  // Fixes React Router issues
  },
  build: {
    outDir: "dist",  // Ensures the correct build folder
  }
});
