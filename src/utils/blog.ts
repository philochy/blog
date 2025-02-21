import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

import dayjs from 'dayjs';

import { findAllTags } from './tags';

import { type ListItem, type Tag } from '@/types/api';

/** */
const getNormalizedPost = async (
  blog: CollectionEntry<'post'>
): Promise<ListItem> => {
  const { data } = blog;
  const tags = await findAllTags();
  let labels = JSON.parse(JSON.stringify(data.labels || []));
  if (Array.isArray(labels) && labels.length) {
    labels = labels.map((item: Tag) => ({
      ...tags.find((s) => s.name === item.name),
    }));
  } else {
    labels = [];
  }

  return {
    ...data,
    path:
      (
        labels[0] || {
          ename: 'All',
          path: '/all-tags',
        }
      ).path + data.path,
    name_ch: data.name,
    name: data.author_name || '"Unknown Author"',
    typeDes: data?.knowledgeDes || '',
    time: dayjs(data.public_time),
    pv: 0,
    avatar: data.author_avatar || '/images/nopic-avatar.webp',
    authorDesc: data.author_description || 'No description available',
    tag: labels,
    imageUrl: data?.knowledgePic || '/images/nopic.webp',
    publishDate: data?.public_time || data?.updateTime || data?.createTime,
    lastModDate: data?.updateTime || data?.public_time || data?.createTime,
  };
};

/** */
const load = async () => {
  const posts = await getCollection('post', () => true);
  const normalizedPosts = posts.map(
    async (post) => await getNormalizedPost(post)
  );
  const results = await Promise.all(normalizedPosts);
  return results;
};

let _posts: ListItem[];

/** */
export const fetchPosts = async (): Promise<ListItem[]> => {
  if (!_posts) {
    _posts = await load();
  }

  return _posts;
};

/** */
export const getBLogList = async (tag?: string | null) => {
  const posts = await fetchPosts();

  const result = posts.filter(
    (item) => !tag || JSON.stringify(item.tag).includes(tag)
  );

  const hotList = posts.filter((item) =>
    JSON.stringify(item.labels_mark || '').includes('hot')
  );

  return { list: result, hotList };
};

/** */
export const getSubling = async (id: string) => {
  const { list } = await getBLogList();
  const index = list.findIndex((item) => item.ID === id);

  // 处理闭环逻辑
  const nextIndex = (index + 1) % list.length;
  const prevIndex = (index - 1 + list.length) % list.length;

  return {
    next: list[nextIndex],
    prev: list[prevIndex],
  };
};
