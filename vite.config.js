import { defineConfig } from 'vite';

// __DEMO__ builds drop the Supabase code and save progress in localStorage only.
export default defineConfig(({ mode }) => ({
  base: process.env.VITE_BASE || './',
  define: { __DEMO__: JSON.stringify(mode === 'demo') },
  build: {
    outDir: mode === 'demo' ? 'dist-demo' : 'dist',
    assetsInlineLimit: mode === 'demo' ? 100000000 : 4096,
    cssCodeSplit: false,
    chunkSizeWarningLimit: 4000,
  },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.js'],
    testTimeout: 180000,
  },
}));
