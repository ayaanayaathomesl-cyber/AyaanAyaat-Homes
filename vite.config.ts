import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
    },
    define: {
      // Explicitly inject the API key. If env.API_KEY is undefined, it sets it to empty string.
      // This is critical for the Assistant component to detect if the key is missing.
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ""),
      // Polyfill process.env for other libraries that might expect it
      'process.env': {}
    }
  };
});