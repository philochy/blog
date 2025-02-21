import type { APIRoute } from 'astro';

const getRobotsTxt = (sitemapURL: URL, rssURL: URL, imageSitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
Sitemap: ${rssURL.href}
Sitemap: ${imageSitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);
  const rssURL = new URL('rss.xml', site);
  const imageSitemapURL = new URL('sitemap-image.xml', site);

  return new Response(getRobotsTxt(sitemapURL, rssURL, imageSitemapURL), {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};
