import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { countWords } from './markdown';
import type { PostFrontmatter, PostParams, PostRecord } from './types';

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

function parsePostFilename(filename: string): PostParams {
  const match = filename.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/);
  if (!match) {
    throw new Error(`Invalid post filename: ${filename}`);
  }

  const [, year, month, day, slug] = match;
  if (!year || !month || !day || !slug) {
    throw new Error(`Invalid post filename: ${filename}`);
  }

  return { year, month, day, slug };
}

function firstParagraph(markdown: string): string {
  const blocks = markdown.split(/\n\s*\n/).map((x) => x.trim());
  for (const block of blocks) {
    if (!block || block.startsWith('---')) continue;
    if (block.startsWith('{%') || block.startsWith('[')) continue;
    return block;
  }
  return '';
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item): item is string => typeof item === 'string');
}

function readPostFile(filename: string): PostRecord {
  const source = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf8');
  const parsed = matter(source);
  const frontmatter = parsed.data as Partial<PostFrontmatter>;
  const parts = parsePostFilename(filename);
  const date = new Date(`${parts.year}-${parts.month}-${parts.day}T00:00:00Z`);
  const separator = frontmatter.excerpt_separator ?? frontmatter['excerpt-seperator'];
  const excerptSource = separator ? parsed.content.split(separator)[0] ?? '' : firstParagraph(parsed.content);
  const wordCount = countWords(parsed.content);

  return {
    filename,
    ...parts,
    date,
    url: `/${parts.year}/${parts.month}/${parts.day}/${parts.slug}`,
    title: typeof frontmatter.title === 'string' ? frontmatter.title : 'Untitled',
    author: typeof frontmatter.author === 'string' ? frontmatter.author : 'William Barkoff',
    tags: toStringArray(frontmatter.tags),
    body: parsed.content,
    excerptSource,
    wordCount,
    readMinutes: Math.max(1, Math.floor(wordCount / 400))
  };
}

function allPostFiles(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .sort((a, b) => b.localeCompare(a));
}

export async function getAllPosts(): Promise<PostRecord[]> {
  const posts = allPostFiles().map((filename) => readPostFile(filename));
  return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getRecentPosts(limit = 3): Promise<PostRecord[]> {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}

export async function getPostByParams(params: PostParams): Promise<PostRecord | null> {
  const filename = `${params.year}-${params.month}-${params.day}-${params.slug}.md`;
  if (!fs.existsSync(path.join(POSTS_DIR, filename))) {
    return null;
  }

  return readPostFile(filename);
}

export function getAllPostParams(): PostParams[] {
  return allPostFiles().map((filename) => {
    const { year, month, day, slug } = parsePostFilename(filename);
    return { year, month, day, slug };
  });
}
