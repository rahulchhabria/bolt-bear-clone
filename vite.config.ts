import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: "rc-sentry-projects",
      project: "bolt-bear-clone",
      authToken: "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",
      sourcemaps: {
        assets: "./dist/**",
      },
    }),
  ],
  
  build: {
    sourcemap: true,
  }
});