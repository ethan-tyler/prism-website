import { defineConfig }        from "vite";
import { vitePlugin as remix } from "@remix-run/dev";
import { vercelPreset }        from "@vercel/remix/vite";
import tsconfigPaths           from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({ presets: [vercelPreset()] }),
    tsconfigPaths(),
  ],
});
