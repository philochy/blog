import Mock from 'mockjs';

export const listData = Mock.mock({
  'items|10': [
    {
      name_ch: '@word(50, 100)',
      typeDes: '@sentence(50, 200)',
      imageUrl: 'https://picsum.photos/500/400?random=@integer(1, 1000)',
      tag: '@pick(["feature", "news", "update"])',
      time: '@date("T")',
      pv: '@integer(1000, 5000)',
      path: '/',
      name: '@name',
      avatar: 'https://picsum.photos/100/100?random=@integer(1, 1000)',
    },
  ],
}).items;
