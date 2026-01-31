import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  // Prioritize process.env for Netlify, then fallback to loaded env
  const apiKey = process.env.API_KEY || env.API_KEY || "";

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
    },
    define: {
      // Explicitly inject the API key into the client-side code
      'process.env.API_KEY': JSON.stringify(apiKey),
      // Polyfill process.env for safety
      'process.env': {}
    }
  };
});