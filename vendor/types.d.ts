interface DatabaseConfig {
  DB_NAME: string;
}

interface EnvironmentConfig {
  ORIGIN: string;
  BASE_URL: string;
  STATIC_BASE: string;
  DOMAIN: string;
  NODE_ENV?: string;
}

interface ReportingConfig {
  REQUEST_URL: string;
}

interface AnalyticsConfig {
  vendors: { googleAnalytics: { id: string | null } };
}

declare module 'virtual:config-loader' {
  export const entrypoint: string;
  export const database: DatabaseConfig;
  export const environment: EnvironmentConfig;
  export const reporting: ReportingConfig;
  export const analytics: AnalyticsConfig;
}
