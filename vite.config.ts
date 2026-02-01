
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      // Disable sourcemaps to prevent Netlify post-processing from hanging
      sourcemap: false,
      // Minify output to speed up processing
      minify: 'esbuild',
    }
  };
});
