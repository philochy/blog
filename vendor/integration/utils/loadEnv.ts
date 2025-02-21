import * as fs from 'fs';

import { parse } from 'yaml';

const getEnv = () => process.env.RUNNING_ENV || 'dev';

/**
 * 加载和返回环境配置信息
 * 根据当前的运行环境（开发或生产），从不同的 YAML 环境文件加载配置信息，
 * 并使用 dotenv 库优先从 process.env 中读取环境变量（如果存在）。
 * 最终合并 YAML 文件和 process.env 配置，返回完整的配置信息。
 *
 * @returns {{
 *   database: {
 *     DB_NAME: string
 *   },
 *   environment: {
 *     ORIGIN: string,
 *     DOMIN: string,
 *     BASE_URL: string,
 *     STATIC_BASE: string,
 *     NODE_ENV: string | undefined
 *     OUTDIR: string
 *   },
 *   reporting: {
 *     REQUEST_URL: string
 *   }
 * }} 配置对象，包含以下属性：
 *
 * - database:
 *    - DB_NAME: 数据库名
 *
 * - environment:
 *    - ORIGIN: 域名
 *    - DOMIN: 模板名 (如：m01_xxx)
 *    - BASE_URL: 请求的基础 URL
 *    - STATIC_BASE: 用于 icms/upload 的代理 URL
 *    - NODE_ENV: 当前运行环境， "production" | "development"
 *    - OUTDIR: build路径
 *
 * - reporting:
 *    - REQUEST_URL: 用于上报（询盘、社媒等）的 API 地址
 */
const getEnvConfig = () => {
  const environment = getEnv();

  const file = fs.readFileSync(`./.config/.${environment}.yaml`, 'utf8');

  const config = parse(file);

  return {
    database: {
      ...config.database,
      DB_NAME: process.env.DB_NAME || config.database.DB_NAME,
    },
    environment: {
      ...config.environment,
      ORIGIN: process.env.ORIGIN || config.environment.ORIGIN,
      BASE_URL: process.env.BASE_URL || config.environment.BASE_URL,
      STATIC_BASE: process.env.STATIC_BASE || config.environment.STATIC_BASE,
      DOMIN: process.env.DOMIN || config.environment.DOMIN,
      NODE_ENV: process.env.NODE_ENV || config.environment.NODE_ENV,
    },
    reporting: {
      ...config.reporting,
      REQUEST_URL: process.env.REQUEST_URL || config.reporting.REQUEST_URL,
    },
    analytics: {
      ...config.analytics,
    },
  };
};

export { getEnvConfig };
