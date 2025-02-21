import type { AstroIntegration } from 'astro';

import { getEnvConfig } from './utils/loadEnv';

export default function integration(): AstroIntegration {
  return {
    name: 'integration',
    hooks: {
      'astro:config:setup': async ({ updateConfig }) => {
        const { environment, database, reporting, analytics } = getEnvConfig();

        updateConfig({
          vite: {
            plugins: [
              {
                name: 'vite-plugin-config-loader',
                resolveId(id) {
                  if (id === 'virtual:config-loader') {
                    return id;
                  }
                },
                load(id) {
                  if (id === 'virtual:config-loader') {
                    return `
                      export const environment = ${JSON.stringify(environment)};
                      export const database = ${JSON.stringify(database)};
                      export const reporting = ${JSON.stringify(reporting)};
                      export const analytics = ${JSON.stringify(analytics)};
                    `;
                  }
                },
              },
            ],
          },
        });
      },
    },
  };
}
