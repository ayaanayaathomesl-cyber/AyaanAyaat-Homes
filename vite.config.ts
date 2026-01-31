
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  // Hardcoded fallback for reliability
  const apiKey = "AIzaSyC0rVB7ydv3sPmabf3IoKAnpToEXV40nAQ";

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      // CRITICAL FIX: Disable sourcemaps to prevent Netlify post-processing from hanging
      sourcemap: false,
      // Minify output to speed up processing
      minify: 'esbuild',
    },
    define: {
      'process.env.API_KEY': JSON.stringify(apiKey),
    }
  };
});
