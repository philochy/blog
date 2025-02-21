import type { FormItem, MenuItem } from '@/types/globals';

export const theme = {
  banner: {
    availableStyles: [
      {
        styleId: 'default',
        styleName: '整页 & tabs',
        tag: 1,
      },
      {
        styleId: 'left-image',
        styleName: '左右分布 & select',
        tag: 2,
      },
      {
        styleId: 'full-width',
        styleName: '半屏显示 & tabs',
        tag: 3,
      },
    ],
  },
  list: {
    availableStyles: [
      {
        styleId: 'one-per-row',
        styleName: '一行一个',
        tag: 3,
        pageSize: 9,
      },
      {
        styleId: 'two-per-row',
        styleName: '一行两个',
        tag: 2,
        pageSize: 8,
      },
      {
        styleId: 'three-per-row',
        styleName: '一行三个',
        tag: 1,
        pageSize: 9,
      },
    ],
  },
  modal: {
    availableStyles: [
      {
        styleId: 'default',
        styleName: '页脚弹窗',
        tag: 1,
      },
      {
        styleId: 'compact',
        styleName: '页中弹窗',
        tag: 2,
      },
    ],
  },
  form: {
    availableStyles: [
      {
        styleId: 'compact',
        styleName: '用户简化操作',
        tag: 1,
      },
      {
        styleId: 'default',
        styleName: '弹框完整提交',
        tag: 2,
      },
    ],
  },
  side: {
    availableStyles: [
      {
        styleId: 'style-one',
        styleName: '样式一',
        tag: 1,
      },
      {
        styleId: 'style-two',
        styleName: '样式二',
        tag: 2,
      },
      {
        styleId: 'style-three',
        styleName: '样式三',
        tag: 3,
      },
    ],
  },
} as const;

export const formConfig: FormItem[] = [
  {
    type: 'input',
    __type: 'email',
    name: 'email',
    placeholder: 'Email',
    required: true,
  },
  {
    type: 'input',
    __type: 'text',
    placeholder: 'Telephone',
    name: 'phoneNumber',
    required: true,
  },
  {
    type: 'textarea',
    rows: '4',
    placeholder: 'Content',
    name: 'content',
    className: 'flex-1',
    required: true,
  },
] as const;

const menu: MenuItem[] = [
  {
    text: 'Home',
    href: '/',
  },
  {
    text: 'Products',
    href: '/',
    children: [
      {
        text: 'Electronics',
        href: '/',
        children: [
          {
            text: 'Mobile Phones',
            href: '/',
          },
          {
            text: 'Laptops',
            href: '/',
          },
          {
            text: 'Cameras',
            href: '/',
          },
        ],
      },
      {
        text: 'Fashion',
        href: '/',
        children: [
          {
            text: 'Men',
            href: '/',
          },
          {
            text: 'Women',
            href: '/',
          },
          {
            text: 'Accessories',
            href: '/',
          },
        ],
      },
      {
        text: 'Home & Living',
        href: '/',
        children: [
          {
            text: 'Furniture',
            href: '/',
          },
          {
            text: 'Decor',
            href: '/',
          },
          {
            text: 'Kitchenware',
            href: '/',
          },
        ],
      },
    ],
  },
  {
    text: 'Services',
    href: '/',
    children: [
      {
        text: 'Consulting',
        href: '/',
      },
      {
        text: 'Support',
        href: '/',
      },
      {
        text: 'Custom Development',
        href: '/',
      },
    ],
  },
  {
    text: 'News',
    href: '/',
  },
  {
    text: 'Blog',
    href: '/',
  },
  {
    text: 'About Us',
    href: '/',
    children: [
      {
        text: 'Our Team',
        href: '/',
      },
      {
        text: 'Careers',
        href: '/',
      },
      {
        text: 'Mission & Values',
        href: '/',
      },
    ],
  },
  {
    text: 'Contact Us',
    href: '/',
  },
];

export const headerData = {
  links: menu,
};

export const workflow = [
  {
    icon: 'tabler:phone-check',
    text: 'Determine The Model',
  },
  {
    icon: 'tabler:contract',
    text: 'Sign a Contract',
  },
  {
    icon: 'tabler:building-warehouse',
    text: 'Warehouse Stocking',
  },
  {
    icon: 'tabler:ship',
    text: 'Warehouse Shipment',
  },
  {
    icon: 'tabler:report-analytics',
    text: 'Customer Acceptance',
  },
  {
    icon: 'tabler:headphones',
    text: 'After-sale Service',
  },
] as const;

export const footerData = {
  menu,
  shareList: [
    {
      icon: 'tabler:brand-facebook',
      link: '/',
    },
    {
      icon: 'tabler:brand-twitter',
      link: '/',
    },
    {
      icon: 'tabler:brand-instagram',
      link: '/',
    },
    {
      icon: 'tabler:brand-youtube',
      link: '/',
    },
    {
      icon: 'tabler:brand-tiktok',
      link: '/',
    },
    {
      icon: 'tabler:brand-pinterest',
      link: '/',
    },
  ],
  hotProdcuts: {
    title: 'Products',
    list: [
      {
        text: 'Low Voltage Products and Systems',
        href: '/',
      },
      {
        text: 'Industrial Automation and Control',
        href: '/',
      },
      {
        text: 'Industrial Automation and Control',
        href: '/',
      },
      {
        text: 'Critical Power, Cooling and Racks',
        href: '/',
      },
      {
        text: 'Solar & Energy Storage',
        href: '/',
      },
      {
        text: 'Solar & Energy Storage',
        href: '/',
      },
    ],
  },
  formConfg: [
    {
      type: 'input',
      __type: 'text',
      placeholder: 'Name',
      className: 'footer-form-input',
      name: 'name',
      required: true,
    },
    {
      type: 'input',
      __type: 'email',
      placeholder: 'Email',
      className: 'footer-form-input',
      name: 'email',
      required: true,
    },
    {
      type: 'textarea',
      rows: '4',
      placeholder: 'Message',
      className: 'footer-form-input col-span-2',
      name: 'content',
      required: true,
    },
  ],
  copyright:
    'Copyright@2024-2026 All Rights Reserved. Powered by Al Seeker Leopard',
};

export const tags = [
  {
    title: '行业见解',
    title_en: 'Industry Insights',
    url: '/industry-insights',
  },
  { title: '产品更新', title_en: 'Product Updates', url: '/product-updates' },
  {
    title: '产品与服务',
    title_en: 'Products & Services',
    url: '/products-services',
  },
  {
    title: '操作指南',
    title_en: 'Operational Guide',
    url: '/operational-guide',
  },
  { title: '成功案例', title_en: 'Case Studies', url: '/case-studies' },
  {
    title: '客户推荐',
    title_en: 'Client Testimonials',
    url: '/client-testimonials',
  },
  {
    title: '比较分析',
    title_en: 'Comparative Analysis',
    url: '/comparative-analysis',
  },
];
