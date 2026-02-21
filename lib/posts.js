import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { countWords, preprocessJekyllIncludes, renderMarkdownToHtml } from './markdown';

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

function parsePostFilename(filename) {
  const match = filename.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/);
  if (!match) {
    throw new Error(`Invalid post filename: ${filename}`);
  }

  return {
    year: match[1],
    month: match[2],
    day: match[3],
    slug: match[4]
  };
}

function firstParagraph(markdown) {
  const blocks = markdown.split(/\n\s*\n/).map((x) => x.trim());
  for (const block of blocks) {
    if (!block || block.startsWith('---')) continue;
    if (block.startsWith('{%') || block.startsWith('[')) continue;
    return block;
  }
  return '';
}

function readPostFile(filename) {
  const source = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf8');
  const parsed = matter(source);
  const parts = parsePostFilename(filename);
  const date = new Date(`${parts.year}-${parts.month}-${parts.day}T00:00:00Z`);
  const separator = parsed.data.excerpt_separator;
  const excerptSource = separator
    ? parsed.content.split(separator)[0]
    : firstParagraph(parsed.content);

  return {
    filename,
    ...parts,
    date,
    url: `/${parts.year}/${parts.month}/${parts.day}/${parts.slug}`,
    title: parsed.data.title,
    author: parsed.data.author || 'William Barkoff',
    tags: parsed.data.tags || [],
    body: parsed.content,
    excerptSource,
    wordCount: countWords(parsed.content),
    readMinutes: Math.max(1, Math.floor(countWords(parsed.content) / 400))
  };
}

function allPostFiles() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .sort((a, b) => b.localeCompare(a));
}

export async function getAllPosts() {
  const posts = await Promise.all(
    allPostFiles().map(async (filename) => {
      const post = readPostFile(filename);
      const [html, excerptHtml] = await Promise.all([
        renderMarkdownToHtml(post.body),
        renderMarkdownToHtml(preprocessJekyllIncludes(post.excerptSource))
      ]);
      return {
        ...post,
        html,
        excerptHtml
      };
    })
  );

  return posts.sort((a, b) => b.date - a.date);
}

export async function getRecentPosts(limit = 3) {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}

export async function getPostByParams(params) {
  const filename = `${params.year}-${params.month}-${params.day}-${params.slug}.md`;
  if (!fs.existsSync(path.join(POSTS_DIR, filename))) {
    return null;
  }

  const post = readPostFile(filename);
  const html = await renderMarkdownToHtml(post.body);
  return { ...post, html };
}

export function getAllPostParams() {
  return allPostFiles().map((filename) => {
    const { year, month, day, slug } = parsePostFilename(filename);
    return { year, month, day, slug };
  });
}
