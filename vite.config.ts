/// <reference types="vitest/config" />
import { createReadStream, existsSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite preview does not read vercel.json. This test-only middleware maps clean
 * URLs to the static HTML files generated for Vercel, so the no-JS metadata can
 * be verified locally on the same URLs as production.
 */
function previewStaticRoutes(): Plugin {
  return {
    name: 'preview-static-routes',
    configurePreviewServer(server) {
      server.middlewares.use((request, response, next) => {
        const path = request.url?.split('?')[0] ?? '';
        if (!path || path === '/' || path.includes('.')) return next();
        const candidates = [`dist${path}.html`, `dist${path}/index.html`];
        const file = candidates.find((candidate) => existsSync(candidate));
        if (!file) return next();
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        createReadStream(file).pipe(response);
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), previewStaticRoutes()],
  server: { port: 5173 },
  build: { target: 'es2022' },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    restoreMocks: true,
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
