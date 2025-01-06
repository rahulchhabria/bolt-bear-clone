import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov', 'cobertura'], // Added cobertura for better test analytics
      exclude: [
        'node_modules/**',
        'dist/**',
        '**/*.d.ts',
        'coverage/**',
        'vite.config.ts',
        'vitest.config.ts',
      ],
      reportOnFailure: true, // Always generate reports
    },
    testTimeout: 10000,
    hookTimeout: 10000,
  },
});