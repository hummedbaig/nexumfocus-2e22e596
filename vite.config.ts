import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: false,
  vite: {
    preview: { host: "127.0.0.1", strictPort: false, allowedHosts: true },
  },
  tanstackStart: {
    prerender: { enabled: true, crawlLinks: true },
    pages: [
      { path: "/", prerender: { enabled: true } },
      { path: "/about", prerender: { enabled: true } },
      { path: "/services", prerender: { enabled: true } },
      { path: "/contact", prerender: { enabled: true } },
    ],
  },
});
