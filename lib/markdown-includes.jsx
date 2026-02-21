import { Fragment } from 'react';

function renderInlineMarkdownLinks(text) {
  if (!text) return null;

  const out = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let key = 0;

  for (const match of text.matchAll(regex)) {
    const [full, label, href] = match;
    const start = match.index ?? 0;
    if (start > lastIndex) {
      out.push(text.slice(lastIndex, start));
    }
    out.push(
      <a href={href} key={`link-${key}`}>
        {label}
      </a>
    );
    key += 1;
    lastIndex = start + full.length;
  }

  if (lastIndex < text.length) {
    out.push(text.slice(lastIndex));
  }

  if (out.length === 1) {
    return out[0];
  }

  return <Fragment>{out}</Fragment>;
}

export function PostImage({
  side = 'right',
  maxwidth,
  url = '',
  caption = '',
  attribution = ''
}) {
  const resolvedMaxWidth = maxwidth;

  return (
    <figure className={`post-image post-image-${side}`}>
      <a href={url}>
        <img src={url} title={caption} alt={caption} style={{ maxWidth: resolvedMaxWidth }} />
      </a>
      <figcaption>{renderInlineMarkdownLinks(caption)}</figcaption>
      <cite className="is-size-6">{renderInlineMarkdownLinks(attribution)}</cite>
    </figure>
  );
}
