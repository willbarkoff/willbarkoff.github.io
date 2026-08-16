export interface PostParams {
  year: string;
  month: string;
  day: string;
  slug: string;
}

export interface PostFrontmatter {
  title: string;
  blurb: string;
  author?: string;
  tags?: string[];
  excerpt_separator?: string;
  "excerpt-seperator"?: string;
}

export interface PostRecord extends PostParams {
  filename: string;
  date: Date;
  url: string;
  title: string;
  author: string;
  tags: string[];
  body: string;
  excerptSource: string;
  blurb: string;
  wordCount: number;
  readMinutes: number;
}

export interface PageFrontmatter {
  title: string;
  subtitle?: string;
  layout?: string;
  hidden?: boolean;
}

export interface RawPage<TFrontmatter = Record<string, unknown>> {
  data: TFrontmatter;
  content: string;
}

export interface MarkdownPage<TFrontmatter = Record<string, unknown>>
  extends RawPage<TFrontmatter> {
  html: string;
}

export interface SiteMeta {
  title: string;
  tagline: string;
  accent: string;
}

export interface NavLink {
  title: string;
  url: string;
}

export interface SocialLink {
  icon: string;
  url: string;
  username: string;
}

export interface FooterLink {
  name: string;
  url: string;
}

export interface ExperienceCollaborator {
  name: string;
  url?: string;
}

export interface ExperienceLink {
  text: string;
  url: string;
}

export interface Experience {
  title: string;
  subtitle?: string;
  style: string;
  image?: string;
  skills: string[];
  collaborators?: ExperienceCollaborator[];
  description: string;
  links?: ExperienceLink[];
  awards?: string[];
}
