import { XMLBuilder } from 'fast-xml-parser';

import { getBLogList } from '@/utils/blog';

import { getConfig } from '@/utils';

export const GET = async () => {
  const { website } = getConfig();
  const { list } = await getBLogList();

  const root = {
    ['?xml']: { '@_version': '1.0', '@_encoding': 'UTF-8' },
    urlset: {
      '@_xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
      '@_xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1',
      'url': list
        .filter((item) => !!item?.knowledgePic)
        .map((post) => ({
          loc: new URL(post.path, website).toString(),
          image: [
            {
              'image:loc': new URL(
                post.knowledgePic || '/images/nopic.webp',
                website
              ).toString(),
              'image:title': post.name_ch,
            },
          ],
        })),
    },
  };

  const xmlOptions = {
    ignoreAttributes: false,
    suppressEmptyNode: true,
    suppressBooleanAttributes: false,
  };

  const builder = new XMLBuilder(xmlOptions);
  const xmlString = builder.build(root);

  return new Response(xmlString, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
