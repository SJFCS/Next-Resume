// 元数据接口
export interface Metadata {
  name?: string;
  age?: number;
  phone?: string;
  email?: string;
  photo?: string;
  github?: string;
  blog?: string;
}

// 经历项目接口
export interface ExperienceItem {
  title: string;
  subtitle?: string;
  description?: string;
  date?: string;
  items?: string[];
  image?: string;
  url?: string;
}

// 章节接口
export interface Section {
  title: string;
  experience?: ExperienceItem[];
}

// 根接口
export interface ResumeData {
  metadata: Metadata;
  sections: Section[];
}