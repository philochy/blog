/// <reference path="../.astro/types.d.ts" />
/// <reference types="../vendor/integration/types.d.ts" />
declare namespace NodeJS {
  interface ProcessEnv {
    ORIGIN: string;
  }
}
declare const __RUNNING_ENV__: string;
interface Window {
  basic_script?: boolean;
  Alpine: import('alpinejs').Alpine;
  url: string;
  filename: string;
}
declare module 'lodash.merge';
declare module 'rollup-plugin-terser' {
  import { Plugin } from 'rollup';
  export function terser(options?: unknown): Plugin;
}
