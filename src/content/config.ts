import { defineCollection } from 'astro:content';

import * as envConfig from 'virtual:config-loader';

import { type Blog } from '@/types/api';

const {
  database: { DB_NAME },
  environment: { BASE_URL },
} = envConfig;
const postCollection = defineCollection({
  loader: async () => {
    const response = await fetch(
      `${BASE_URL}/api/appapi/blog/data?DynamicDbConnectName=${DB_NAME}`
    );
    const {
      result: { data: { knowledge } = {} },
    } = await response.json();
    return knowledge.map((blog: Blog) => ({ ...blog, id: blog.ID }));
  },
});

/** tag */
const tagCollection = defineCollection({
  loader: async () => {
    const response = await fetch(
      `${BASE_URL}/api/appapi/blog/data?DynamicDbConnectName=${DB_NAME}`
    );
    const {
      result: { data: { tags } = {} },
    } = await response.json();

    return [...tags].map((item) => ({
      id: item.id || item.ID,
      ...item,
    }));
  },
});
export const collections = {
  post: postCollection,
  tags: tagCollection,
};
