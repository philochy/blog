import Mock from 'mockjs';

interface ContentItem {
  type: 'h1' | 'h2' | 'h3' | 'p' | 'image';
  text?: string;
  image?: string;
}

const generateContentItem = (item: ContentItem): string => {
  switch (item.type) {
    case 'h1':
      return `<h1>${item.text}</h1>`;
    case 'h2':
      return `<h2>${item.text}</h2>`;
    case 'h3':
      return `<h3>${item.text}</h3>`;
    case 'p':
      return `<p>${item.text}</p>`;
    case 'image':
      return `<img src="${item.image}" alt="Random Image" />`;
    default:
      return '';
  }
};

const mockHtmlContent: string = Mock.mock({
  'content|20-45': [
    {
      'type|1': ['h1', 'h2', 'h3', 'p', 'image'] as const,
      'text|1': '@sentence(5, 10)',
      'image': () =>
        `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 1000)}`,
    },
  ],
})
  .content.map((item: ContentItem) => generateContentItem(item))
  .join('');

export { mockHtmlContent };
