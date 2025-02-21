import { existsSync, readFileSync, writeFileSync } from 'fs';
import * as path from 'path';

import * as envConfig from 'virtual:config-loader';

import { type Author, type Banner, type DataRoot } from '@/types/api';
import { highlightText } from '@/utils';

const {
  database: { DB_NAME },
  environment: { BASE_URL },
} = envConfig;

const cachePath = path.join(process.cwd(), 'public', 'userData.json');

export const fetchData = async () => {
  if (existsSync(cachePath)) {
    return JSON.parse(readFileSync(cachePath, 'utf-8')) as DataRoot;
  }
  const response = await fetch(
    `${BASE_URL}/api/appapi/blog/data?DynamicDbConnectName=${DB_NAME}`
  );
  const {
    result: { data = {} },
  } = await response.json();

  writeFileSync(cachePath, JSON.stringify(data, null, 2), 'utf-8');
  return data as DataRoot;
};

export const getThemeConfig = async () => {
  const {
    style_settings: [
      {
        styleconfig: {
          banner_style_type = '1',
          list_style_type = '1',
          modal_ask_type = '1',
          modal_auto_type = '1',
        },
        file_urls: [{ url = null, name = null } = {}],
      },
    ],
    tdk_config: [{ title, description, keywords }],
  } = await fetchData();
  return {
    url,
    name,
    banner: parseInt(banner_style_type),
    list: parseInt(list_style_type),
    modal: parseInt(modal_ask_type),
    form: parseInt(modal_auto_type),
    title,
    description,
    keywords,
  };
};

export const getBanner = async () => {
  const { style_settings_banners } = await fetchData();
  const banner = style_settings_banners
    .filter((s) => s.status !== 2)
    .reduce(
      (acc, banner) => {
        const key = banner.sort;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(banner);
        return acc;
      },
      {} as Record<number, Banner[]>
    );
  return {
    banner,
    banners: style_settings_banners.filter((s) => s.status !== 2),
  };
};
export const getAuthorById = async (id: string) => {
  const { author } = await fetchData();

  return author.find((item) => item.ID === id) || ({} as Author) || {};
};

export const getFormConfig = async () => {
  const {
    style_settings: [
      {
        askpaneStyle: {
          lead_word_autopane = 'Fill in Your Email to Get a Quote.',
          btn_noticeword_autopane = 'Get A Free Quote',
          modal_imgurl = '',
          lead_word = 'Based on your location and orderquantity, you will have the opportuni.ty to receive a limited time free shipping promotion',
          lead_keyword = 'free shipping',
          btn_noticeword = 'Get A Free Quote',
        },
        companyShowinfo: {
          imgurl: imageUrl = '',
          show_title: title = 'Corporate Purpose',
          content:
            subTitle = 'Al Single Leopard is a team of companies mainl engaged in im-ported bearings, with sales brand including SKF bearings fromSweden, bearings from Japan.',
        },
      },
    ],
  } = await fetchData();
  const content = highlightText(lead_keyword, lead_word);
  return {
    modal: {
      title: lead_word_autopane,
      btnText: btn_noticeword_autopane,
      imageUrl: modal_imgurl,
    },
    form: {
      btnText: btn_noticeword,
      leadingWors: lead_word,
      keyword: lead_keyword,
      content,
    },
    company: {
      imageUrl,
      title,
      subTitle,
    },
  };
};

export const getCategory = async () => {
  const { knowledge_class } = await fetchData();
  return knowledge_class.concat([]);
};
