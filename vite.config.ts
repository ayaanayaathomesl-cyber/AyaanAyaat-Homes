
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  // We set the API key here for compatibility, though the component also has a hardcoded fallback now for maximum reliability
  const apiKey = "AIzaSyC0rVB7ydv3sPmabf3IoKAnpToEXV40nAQ";

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
    },
    define: {
      // Prioritize the specific key replacement
      'process.env.API_KEY': JSON.stringify(apiKey),
    }
  };
});
