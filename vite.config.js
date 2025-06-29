// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ensure there is NO 'esbuild' block here.
  // It's not needed when using .jsx extensions and can cause conflicts.
});