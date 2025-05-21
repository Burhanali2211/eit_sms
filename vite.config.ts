
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Optimize dependencies for browser compatibility
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
    },
    // Exclude problematic dependencies from optimization
    exclude: ['pg', 'pg-native'],
  },
  // Handle Node.js modules for browser compatibility
  build: {
    rollupOptions: {
      external: ['pg-native', 'cloudflare:sockets'],
    },
  },
  // Fix for Node.js modules in the browser
  define: {
    'process.env': {},
    // Add explicit handling for cloudflare:sockets
    'import.meta.CLOUDFLARE_SOCKETS': 'null'
  },
}));
