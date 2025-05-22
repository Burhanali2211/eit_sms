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
  // Completely exclude pg from the build
  optimizeDeps: {
    exclude: ['pg', 'pg-native'],
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
    },
  },
  // Handle Node.js modules for browser compatibility
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      // Explicitly ignore pg-related requires
      ignore: (id) => id.includes('pg') || id.includes('pg-native'),
    },
    rollupOptions: {
      external: ['pg', 'pg-native', 'cloudflare:sockets'],
      output: {
        // Prevent dynamic import warnings 
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      },
    },
  },
  // Provide empty shims for Node.js globals
  define: {
    'process.env': {},
    'global': 'window',
    'import.meta.CLOUDFLARE_SOCKETS': 'null'
  },
}));
