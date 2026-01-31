
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  // Logic to grab the key from process.env (Netlify System Env) or .env file
  // This ensures that when you set API_KEY in Netlify, it gets picked up during build
  const apiKey = process.env.API_KEY || env.API_KEY;

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      // Disable sourcemaps to prevent Netlify post-processing from hanging
      sourcemap: false,
      // Minify output to speed up processing
      minify: 'esbuild',
    },
    define: {
      // This injects the variable into the client-side code at build time
      'process.env.API_KEY': JSON.stringify(apiKey),
    }
  };
});
