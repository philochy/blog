import type { HTMLAttributes } from 'astro/types';

/* SITE */
export type Url = `http://${string}/` | `https://${string}/`;
type Path = `/${string}`;

export interface Site {
  /**
   * 指定最终部署的网址，必须以 http:// 或 https:// 开头。此属性将传递给 Astro 中的
   * {@link https://docs.astro.build/en/reference/configuration-reference/#site `site`} 配置，
   * 用于生成规范 URL（canonical URLs）、rss.xml 和其他功能。
   */
  website: Url;

  /**
   * 指定网站的基础路径，必须以 / 开头。此属性将传递给 Astro 中的
   * {@link https://docs.astro.build/en/reference/configuration-reference/#base `base`} 配置，
   * 用于在子目录中部署时使用。
   *
   * @example
   * `/my-site/`（用于部署到 `https://example.com/my-site/`）
   */
  base: Path;

  /**
   * 指定网站名，用于在前端元数据中格式化标题为 `<pageTitle> - <siteTitle>`。
   * 用于 `src/components/base/Head.astro` 中的标题和元标签。
   */
  title: string;

  /**
   * 指定元标签的默认内容，用于 `src/components/base/Head.astro`。
   */
  description: string;

  /**
   * 指定网站内容的关键字，用于 SEO 优化，关键字为一个字符串，各关键字之间可以用逗号分隔。
   *
   * @example
   * '博客,技术,编程'
   */
  keywords: string;

  /**
   * 指定文档内容的主要语言，用于 `src/layouts/BaseLayout.astro`。
   *
   * @description
   * 语言标签格式需符合
   * {@link https://datatracker.ietf.org/doc/html/rfc5646#appendix-A RFC 5646：用于识别语言的标签}（也称为 BCP 47）。
   *
   * @example
   * 'zh-Hant'（繁体中文）
   * 'fr'（法语）
   */
  lang: string;

  /**
   * 指定页面内容的语言和地区，以便在社交平台上更好地显示内容，用于 `src/components/base/Head.astro`。
   *
   * @description
   * 格式应为 `language_TERRITORY`，详见
   * {@link https://www.unicode.org/cldr/charts/44/supplemental/language_territory_information.html 语言-地区信息}。
   *
   * @example
   * 'zh_CN'
   * 'fr_FR'
   */
  ogLocale: string;
  /**
   * 指定联系邮箱地址。
   */
  email: string;

  /**
   * 指定联系电话。
   */
  telephone: string;

  /**
   * 指定品牌名称。
   */
  brandName: string;

  /**
   * 指定公司名称。
   */
  companyName: string;

  /**
   * 社交媒体分享链接，包含多个社交平台链接。
   */
  share: string[];
}

// components
export interface FormItem {
  type: 'input' | 'textarea';
  placeholder: string;
  label?: string;
  __type?: string;
  id?: string;
  rows?: string;
  className?: string;
  required?: boolean;
  name: string;
}

export interface MenuItem {
  text: string;
  href: string;
  children?: MenuItem[];
}

export interface BlogItem {
  name_ch: string;
  typeDes: string;
  imageUrl: string;
  tag: string;
  time: string | number | Date;
  pv: number;
  path: string;
  name: string;
  avatar: string;
}

export interface HeadingData {
  id: string;
  text: string;
  tag: string;
}

export interface ImageProps extends Omit<HTMLAttributes<'img'>, 'src'> {
  src?: string | ImageMetadata | null;
  width?: string | number | null;
  height?: string | number | null;
  alt?: string | null;
  loading?: 'eager' | 'lazy' | null;
  decoding?: 'sync' | 'async' | 'auto' | null;
  style?: string;
  srcset?: string | null;
  sizes?: string | null;
  fetchpriority?: 'high' | 'low' | 'auto' | null;

  widths?: number[] | null;
  aspectRatio?: string | number | null;
}

export interface ModalStore {
  open: (key: string) => void;
  close: (key: string) => void;
  isOpen: (key: string) => boolean;
  closeAll: () => void;
}
