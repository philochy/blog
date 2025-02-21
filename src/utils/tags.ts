import { getCollection, type CollectionEntry } from 'astro:content';

import type { Tag } from '@/types/api';

const getNormalizedTags = (tag: CollectionEntry<'tags'>) => {
  const { data } = tag;

  return { ...data, path: data.url, ename: data.ename };
};

const load = async () => {
  const tags = await getCollection('tags');
  const normalizedTags = tags.map(getNormalizedTags);

  return [
    {
      ename: 'All',
      path: '/all-tags',
    },
    ...normalizedTags,
  ] as Tag[];
};

let _tag: Tag[];

export const fetchTags = async (): Promise<Tag[]> => {
  if (!_tag) {
    _tag = await load();
  }

  return _tag;
};

export const findAllTags = async (): Promise<Tag[]> => {
  const result = await fetchTags();
  return result;
};
