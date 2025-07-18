const { defineConfig } = require("vite");
const { vitePlugin: remix } = require("@remix-run/dev");
const { vercelPreset } = require("@vercel/remix/vite");
const tsconfigPaths = require("vite-tsconfig-paths");

module.exports = defineConfig({
  plugins: [
    remix({
      presets: [vercelPreset()],
    }),
    tsconfigPaths(),
  ],
});