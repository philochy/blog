import icon from 'astro-icon';

import path from 'path';
import { fileURLToPath } from 'url';

import alpine from '@astrojs/alpinejs';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import { terser } from 'rollup-plugin-terser';
import compression from 'vite-plugin-compression';

import { getConfig } from './src/utils';
import astrowind from './vendor/integration';
import { getEnvConfig } from './vendor/integration/utils/loadEnv';

const {
  environment: { STATIC_BASE, OUTDIR: outDir },
} = getEnvConfig();

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE = getConfig();

export default defineConfig({
  outDir,
  output: 'static',
  site: SITE.website,
  prefetch: true,
  base: SITE.base,
  integrations: [
    alpine({ entrypoint: './src/plugin/alpinejs' }),
    sitemap(),
    tailwind({ applyBaseStyles: false }),
    astrowind(),
    icon({
      include: {
        tabler: ['*'],
      },
    }),
  ],
  vite: {
    plugins: [
      compression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 1024,
        deleteOriginFile: false,
      }),
    ],
    build: {
      chunkSizeWarningLimit: 800,
      cssCodeSplit: true,
      assetsInlineLimit: 1024 * 6,
      rollupOptions: {
        plugins: [
          terser({
            compress: {
              drop_console: true,
              drop_debugger: true,
            },
          }),
        ],
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/icms/upload/': {
          target: STATIC_BASE,
          changeOrigin: true,
        },
      },
    },
  },
});
