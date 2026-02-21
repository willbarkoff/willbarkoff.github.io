import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { renderMarkdownToHtml } from './markdown';
import type { MarkdownPage, RawPage } from './types';

const ROOT = process.cwd();

function readSourceFile(relPath: string): string {
  return fs.readFileSync(path.join(ROOT, relPath), 'utf8');
}

export function getRawPage<TFrontmatter = Record<string, unknown>>(
  relPath: string
): RawPage<TFrontmatter> {
  const parsed = matter(readSourceFile(`content/pages/${relPath}`));
  return {
    data: parsed.data as TFrontmatter,
    content: parsed.content
  };
}

export async function getMarkdownPage<TFrontmatter = Record<string, unknown>>(
  relPath: string
): Promise<MarkdownPage<TFrontmatter>> {
  const page = getRawPage<TFrontmatter>(relPath);
  const html = await renderMarkdownToHtml(page.content);
  return {
    ...page,
    html
  };
}
