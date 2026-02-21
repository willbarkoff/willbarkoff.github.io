import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { renderMarkdownToHtml } from './markdown';

const ROOT = process.cwd();

function readSourceFile(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), 'utf8');
}

export function getRawPage(relPath) {
  const parsed = matter(readSourceFile(`content/pages/${relPath}`));
  return {
    data: parsed.data,
    content: parsed.content
  };
}

export async function getMarkdownPage(relPath) {
  const page = getRawPage(relPath);
  const html = await renderMarkdownToHtml(page.content);
  return {
    ...page,
    html
  };
}
