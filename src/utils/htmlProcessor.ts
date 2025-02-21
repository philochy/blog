import { JSDOM } from 'jsdom';

import { type HeadingData } from '@/types/globals';
/**
 * 为指定的标题标签（如 h2, h3, h4）添加锚点链接。
 *
 * @param {string} htmlString - 原始 HTML 字符串
 * @param {Array<string>} tags - [tags=['h2', 'h3', 'h4', 'h5', 'h6']] - 需要处理的标题标签数组（如 'h2', 'h3' 等）
 * @param {Function} anchorGenerator - 可选的自定义函数，用于生成锚点 ID。如果未提供，
 *     则使用默认生成器，默认生成器将标题文本转换为小写，并将空格替换为连字符
 * @returns {{ html: string, headings: Array<{ id: string, text: string, tag: string }> }} -
 *     返回包含处理后的 HTML 字符串和标题信息数组的对象。
 *     - `html`: 处理后的 HTML 字符串。
 *     - `headings`: 包含标题标签的属性信息数组，每个对象包括：
 *         - `id`: 为标题生成的锚点 ID。
 *         - `text`: 标题标签中的文本内容。
 *         - `tag`: 标题的标签名称（如 'h1', 'h2' 等）。
 */

export const addAnchorsToHeadings = (
  htmlString: string,
  tags: string[] = ['h2', 'h3', 'h4', 'h5', 'h6'],
  anchorGenerator?: (text: string) => string
): { html: string; headings: HeadingData[] } => {
  const dom = new JSDOM(htmlString);

  const document = dom.window.document;

  const headings: HeadingData[] = [];

  tags.forEach((tag) => {
    // 获取所有指定的标题标签
    const headingElements = document.querySelectorAll(tag);

    headingElements.forEach((heading) => {
      // 生成锚点 id，使用自定义生成器或默认的方式
      const anchorId = anchorGenerator
        ? anchorGenerator(heading.textContent || '')
        : (heading.textContent || '').trim().toLowerCase().replace(/\s+/g, '-');

      // 给标题标签加上 id
      heading.setAttribute('id', anchorId);

      // 将标题的属性存储在数组中
      headings.push({
        id: anchorId,
        text: heading.textContent || '',
        tag: tag,
      });
    });
  });
  return { html: dom.serialize(), headings };
};
