import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { PostImage } from './markdown-includes.jsx';

function escapeHtmlAttr(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('\n', ' ');
}

export function preprocessJekyllIncludes(input) {
  return input.replace(/{%\s*include\s+post-image\.html([\s\S]*?)%}/g, (_full, attrsBlock) => {
    const attrs = {};
    const regex = /(\w+)="([^"]*)"/g;
    for (const match of attrsBlock.matchAll(regex)) {
      attrs[match[1]] = match[2];
    }

    const side = attrs.side ? ` side="${escapeHtmlAttr(attrs.side)}"` : '';
    const maxWidth = attrs.max_width ? ` maxwidth="${escapeHtmlAttr(attrs.max_width)}"` : '';
    const url = attrs.url ? ` url="${escapeHtmlAttr(attrs.url)}"` : '';
    const caption = attrs.caption ? ` caption="${escapeHtmlAttr(attrs.caption)}"` : '';
    const attribution = attrs.attribution
      ? ` attribution="${escapeHtmlAttr(attrs.attribution)}"`
      : '';

    return `\n\n<post-image${side}${maxWidth}${url}${caption}${attribution}></post-image>\n\n`;
  });
}

function rehypeUnwrapPostImageParagraphs() {
  return (tree) => {
    function visit(node) {
      if (!node || !node.children || !Array.isArray(node.children)) return;

      const nextChildren = [];
      for (const child of node.children) {
        if (child && child.type === 'element' && child.tagName === 'p' && Array.isArray(child.children)) {
          const meaningfulChildren = child.children.filter(
            (x) => !(x.type === 'text' && !x.value.trim())
          );
          if (
            meaningfulChildren.length === 1 &&
            meaningfulChildren[0].type === 'element' &&
            meaningfulChildren[0].tagName === 'post-image'
          ) {
            nextChildren.push(meaningfulChildren[0]);
            continue;
          }
        }
        visit(child);
        nextChildren.push(child);
      }

      node.children = nextChildren;
    }

    visit(tree);
  };
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

export async function renderMarkdownToReact(markdown) {
  const processed = preprocessJekyllIncludes(markdown);
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeUnwrapPostImageParagraphs)
    .use(rehypeKatex)
    .use(rehypeReact, {
      Fragment,
      jsx,
      jsxs,
      components: {
        'post-image': PostImage
      }
    })
    .process(processed);

  return file.result;
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
