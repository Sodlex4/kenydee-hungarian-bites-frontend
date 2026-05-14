import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  // base — controls how asset paths are resolved in production builds.
  //
  // Vercel (vercel.json rewrites): base = '/'
  //   Vercel serves at the root domain, so assets are at /assets/file.js.
  //   No base prefix needed.
  //
  // GitHub Pages (project site): base = '/repo-name/'
  //   GitHub Pages serves at username.github.io/repo-name/, so assets are at
  //   /repo-name/assets/file.js. The base must match the repository name.
  //   This is injected via --base CLI flag in .github/workflows/deploy.yml.
  //
  // Local dev: base = '/' (default)
  //   Vite dev server always serves at the root.
  base: "/",

  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-charts': ['recharts'],
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tooltip', '@radix-ui/react-toast'],
        },
      },
    },
  },
});
