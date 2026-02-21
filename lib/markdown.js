import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';

function escapeAttr(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function inlineMarkdownLinksToHtml(text) {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

export function preprocessJekyllIncludes(input) {
  return input.replace(/{%\s*include\s+post-image\.html([\s\S]*?)%}/g, (_full, attrsBlock) => {
    const attrs = {};
    const regex = /(\w+)="([^"]*)"/g;
    for (const match of attrsBlock.matchAll(regex)) {
      attrs[match[1]] = match[2];
    }

    const side = attrs.side || 'right';
    const maxWidth = attrs.max_width || 'initial';
    const url = attrs.url || '';
    const caption = attrs.caption || '';
    const attribution = attrs.attribution || '';

    return `<figure class="post-image post-image-${escapeAttr(side)}">\n<a href="${escapeAttr(url)}">\n<img src="${escapeAttr(url)}" title="${escapeAttr(caption)}" alt="${escapeAttr(caption)}" style="max-width: ${escapeAttr(maxWidth)};" />\n</a>\n<figcaption>${inlineMarkdownLinksToHtml(caption)}</figcaption>\n<cite class="is-size-6">${inlineMarkdownLinksToHtml(attribution)}</cite>\n</figure>`;
  });
}

export async function renderMarkdownToHtml(markdown) {
  const processed = preprocessJekyllIncludes(markdown);
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .process(processed);

  return String(file);
}

export function countWords(text) {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[[^\]]+\]\([^)]+\)/g, ' ')
    .split(/\s+/)
    .map((x) => x.trim())
    .filter(Boolean).length;
}
