import type { Dayjs } from 'dayjs';

export interface Author {
  _id: string;
  ID: string;
  create_time: string;
  name: string;
  status: number;
  timestamp: number;
  avatar_url?: string;
}

export interface Category {
  _id: string;
  ID: string;
  createTime: string;
  name: string;
  sort: string;
  type: string;
  typeDes: string;
  url: string;
}

export interface FileUrl {
  url: string;
  name: string;
  status: string;
  percentage: number;
  uid: number;
}
export interface Tag {
  name: string;
  color: string;
  path: string;
  id: string;
  background: string;
  ename: string;
}
export interface AskPaneStyle {
  lead_keyword: string;
  btn_noticeword: string;
  lead_word: string;
  modal_imgurl: string;
  btn_noticeword_autopane: string;
  lead_word_autopane: string;
}
export interface CompanyShowInfo {
  imgurl: string;
  show_title: string;
  content: string;
}
export interface StyleConfig {
  tags: Tag[];
  banner_style_type: string;
  list_style_type: string;
  modal_auto_type: string;
  modal_ask_type: string;
  side_nav_type: string;
}
export interface StyleSettings {
  _id: string;
  ID: string;
  askpaneStyle: AskPaneStyle;
  companyShowinfo: CompanyShowInfo;
  createTime: string;
  file_urls: FileUrl[];
  styleconfig: StyleConfig;
  updateTime: string;
}
export interface Banner {
  _id: string;
  ID: string;
  createTime: string;
  glid: string;
  height: number;
  name: string;
  sort: number;
  title: string;
  type?: 'phone';
  url: string;
  width: number;
  status: number;
  content?: string;
  linkurl?: string;
}
interface MessageConfig {
  _id: string;
  ID: string;
  email: string;
  phone: string;
}
export interface Blog {
  _id: string;
  ID: string;
  authorid: string;
  content: string;
  glKnowledgeIds: string[];
  glProductIds: string;
  glid: string;
  labels: string[];
  name: string;
  provider: string;
  provider_id: string;
  public_time: string;
  publishDate: string;
  sort: number;
  status: number;
  type: string;
  url: string;
  title: string;
  description: string;
  labels_mark: string;
  knowledgeDes?: string;
  knowledgePic?: string;
  path: string;
  author_name?: string;
  author_avatar?: string;
  author_description?: string;
}
export type ListItem = Blog & {
  name_ch: string;
  typeDes: string;
  imageUrl: string;
  time: Time;
  pv: number;
  avatar: string;
  tag: Tag[];
  authorDesc: string;
  path: string;
  lastModDate: string;
  title?: string;
  keywords?: string;
  description?: string;
};
export type Time = string | number | Date | Dayjs;

export interface TDK {
  _id: string;
  iD: string;
  description: string;
  keywords: string;
  tdktype: number;
  title: string;
  type: string;
  update_time: string;
}
export interface DataRoot {
  author: Author[];
  knowledge_class: Category[];
  style_settings: StyleSettings[];
  style_settings_banners: Banner[];
  messageconfig: MessageConfig[];
  knowledge: Blog[];
  tdk_config: TDK[];
  contact_share: ContactShare[];
}

export interface ContactShare {
  _id: string;
  ID: string;
  createTime: Date;
  updateTime: Date;
  Facebook?: string;
  Linkedin?: string;
  Twitter?: string;
  Pinterest?: string;
  YouTuBe?: string;
  MSN?: string;
  email?: string | string[];
  Skype?: string | string[];
  WhatsApp?: string | string[];
  wxcodeurl?: string;
}
