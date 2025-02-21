import { getEnvConfig } from '../../vendor/integration/utils/loadEnv';
import { SITE } from '../config/config';
import { theme } from '../config/theme';
import languages from '../content/language.json';
import { PopupStatus } from '../types/enum';

import type { Site, Url } from '../types/globals';

/**
 * 确保路径最后一位不是斜杠 (/)
 * 如果传入的路径以斜杠结尾且不等于根路径 (`/`)，则移除斜杠并返回。
 * @param pathname - 需要检查的路径字符串
 * @returns 不包含末尾斜杠的路径字符串，或直接返回根路径
 */
export const ensureNoTrailingSlash = (pathname: string): string =>
  pathname === '/'
    ? pathname
    : pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname;

/**
 * 设置弹框状态并持久化到 localStorage
 * 将指定的弹框状态存储在浏览器的 localStorage 中，以便在页面刷新或重载时可以保持状态。
 * @param status - 要设置的弹框状态
 */
export const setPopupStatus = (status: PopupStatus) =>
  localStorage.setItem('popupStatus', status);

/**
 * 从 localStorage 获取弹框状态
 * 检索存储在 localStorage 中的弹框状态。如果状态为已显示，则返回对应的状态；否则返回未显示状态。
 * @returns 当前弹框状态
 */
export const getPopupStatus = (): PopupStatus => {
  const status = localStorage.getItem('popupStatus');
  return status === PopupStatus.SHOWN
    ? PopupStatus.SHOWN
    : PopupStatus.NOT_SHOWN;
};

export const getLanguage = () => languages;

export const getThemeByTag = <T extends keyof typeof theme>(
  key: T,
  tag: number
): (typeof theme)[T]['availableStyles'][number] | undefined => {
  const { availableStyles } = theme[key];
  return availableStyles.find((item) => item.tag === tag);
};

export const themeConfig = ({
  list,
  banner,
  form,
  modal,
  side,
}: {
  list: number;
  banner: number;
  form: number;
  modal: number;
  side: number;
}) => ({
  bannerStyle: getThemeByTag('banner', banner)?.styleId || 'default',
  listStyle: getThemeByTag('list', list)?.styleId || 'one-per-row',
  listPageSize: getThemeByTag('list', list)?.pageSize || 9,
  modalStyleId: getThemeByTag('modal', modal)?.styleId || 'compact',
  formStyleId: getThemeByTag('form', form)?.styleId || 'compact',
  sideStyleId: getThemeByTag('side', side)?.styleId || 'style-one',
});

/**
 * 判断当前是否为开发环境
 * 根据环境变量 RUNNING_ENV 的值来判断，如果不是 'prod'，则认为是开发环境
 * @returns {boolean} 如果是开发环境返回 true，否则返回 false
 */
export const isDev = (() => {
  try {
    return process.env.RUNNING_ENV !== 'prod' ? true : false;
  } catch (_) {
    return true;
  }
})();

export const getConfig = (): Site => {
  const {
    environment: { ORIGIN },
  } = getEnvConfig();
  const website = (
    ORIGIN?.startsWith('https') ? ORIGIN : `https://${ORIGIN || 'default.com'}/`
  ) as Url;
  return {
    ...SITE,
    website,
  };
};

/**
 * 为一个或多个元素添加指定的事件监听器
 *
 * @param {string | Element | NodeListOf<Element> | HTMLElement[] | Element[]} selector - 要添加事件的元素选择器或元素本身，可以是：
 * - CSS 选择器字符串
 * - 单个元素
 * - 元素列表（NodeList、HTMLCollection 或数组）
 *
 * @param {keyof HTMLElementEventMap} event - 事件类型（如 'click'、'mouseover' 等）
 *
 * @param {(e: Event, elem: Element) => void} fn - 事件触发时执行的回调函数，接收两个参数：
 * - e: 事件对象
 * - elem: 当前触发事件的元素
 */
export const attachEvent = (
  selector: string | Element | NodeListOf<Element> | HTMLElement[] | Element[],
  event: keyof HTMLElementEventMap,
  fn: (e: Event, elem: Element) => void
): void => {
  const matches:
    | NodeListOf<Element>
    | HTMLElement[]
    | Element[]
    | Element
    | null =
    typeof selector === 'string'
      ? document.querySelectorAll(selector)
      : selector;

  if (matches && ('length' in matches ? matches.length : true)) {
    if ('forEach' in matches) {
      matches.forEach((elem) => {
        elem.addEventListener(event, (e) => fn(e, elem), false);
      });
    } else {
      matches.addEventListener(event, (e) => fn(e, matches as Element), false);
    }
  }
};

export const uuid = () =>
  '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
    (Number(c) ^ ((Math.random() * 16) >> (Number(c) / 4))).toString(16)
  );

export const paginateList = <T>(
  pathname: string,
  pageSize: number,
  list: T[]
) => {
  const nextPathname = ensureNoTrailingSlash(pathname);
  const extractPageNumber = (url: string) => {
    const parts = url.split('/');
    const lastPart = parts.pop() as string;

    if (lastPart.startsWith('page-')) {
      return parseInt(lastPart.replace('page-', ''), 10);
    }

    return 1;
  };
  const current = extractPageNumber(nextPathname);
  const parsedPageSize = parseInt(String(pageSize), 10);
  const parsedCurrent = parseInt(String(current), 10);

  const total = list.length;

  const startIndex = (parsedCurrent - 1) * parsedPageSize;
  const endIndex = Math.min(startIndex + parsedPageSize, total);

  const paginatedList = list.slice(startIndex, endIndex) as T[];

  return {
    current,
    total,
    data: paginatedList,
    pageSize,
  };
};

export const highlightText = (a: string, b: string): string => {
  const regex = new RegExp(a, 'gi');
  return b.replace(
    regex,
    (match) => `<span class="text-blue-600 font-medium">${match}</span>`
  );
};

export const replaceTDK = (title: string, name: string, type: string) => {
  if (typeof title !== 'string') return title;
  const tdk = {
    knowledgedetail: '软文标题',
  };

  const regExp = new RegExp(tdk[type as keyof typeof tdk], 'g');
  if (!tdk[type as keyof typeof tdk]) {
    return title;
  }

  return title.includes(tdk[type as keyof typeof tdk])
    ? title.replace(regExp, name)
    : title;
};
