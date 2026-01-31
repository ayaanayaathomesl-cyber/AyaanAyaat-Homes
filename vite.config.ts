
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  // Logic to grab the key from process.env (Netlify) or .env file (Local)
  // We use JSON.stringify to ensure it's treated as a string literal in the client code
  // Using the provided valid key "AIzaSyC0rVB7ydv3sPmabf3IoKAnpToEXV40nAQ" as the default fallback
  const apiKey = process.env.API_KEY || env.API_KEY || "AIzaSyC0rVB7ydv3sPmabf3IoKAnpToEXV40nAQ";

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
    },
    define: {
      // This is the crucial part: replacing process.env.API_KEY in the code with the actual value
      'process.env.API_KEY': JSON.stringify(apiKey),
      // Prevents "process is not defined" error in some browser environments
      'process.env': {}
    }
  };
});
