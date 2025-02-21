import type { Site } from '@/types/globals';

export const SITE: Site = {
  website: 'https://default.com/',
  base: '/',
  title: 'title',
  keywords: 'keywords',
  description: 'description',
  lang: 'en',
  ogLocale: 'en_US',
  // json-ld
  email: 'tennyson@somyshare.com',
  telephone: '+1-000-000-0000',
  brandName: 'my site',
  companyName: 'my site',
  share: [
    //个人社媒
    'https://tuite.com',
  ],
};

export const TABS_MAX_LENGTH = 5; // tab最大长度
