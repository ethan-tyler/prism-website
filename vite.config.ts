import { vitePlugin as remix } from '@remix-run/dev';
import { vercelPreset }       from '@vercel/remix/vite';        // Vercel serverless preset
import tsconfigPaths          from 'vite-tsconfig-paths';
import { defineConfig }       from 'vite';

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({ 
      presets: [vercelPreset()],   // ← generates the /functions entry
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
});
