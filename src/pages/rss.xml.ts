import { getRssString } from '@astrojs/rss';
import dayjs from 'dayjs';

import { getBLogList } from '@/utils/blog';

import { getConfig } from '@/utils';
export const GET = async () => {
  const { list } = await getBLogList();
  const { website, title, description } = getConfig();
  const rss = await getRssString({
    title,
    description,
    site: website,
    items: list.map((post) => ({
      link: new URL(post.path || '/', website).toString(),
      title: post.title || post.name_ch,
      description: post.description || post.typeDes,
      pubDate: dayjs(post.time || post.publishDate).toDate(),
      author: post.name,
    })),
  });

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
