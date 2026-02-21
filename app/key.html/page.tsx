import type { Metadata } from 'next';
import { StandardPage } from '@/app/_components/LayoutSections';
import { getMarkdownPage } from '@/lib/pages';
import type { PageFrontmatter } from '@/lib/types';

export const metadata: Metadata = {
  title: 'PGP Key'
};

export default async function KeyHtmlPage() {
  const page = await getMarkdownPage<PageFrontmatter>('key.md');

  return (
    <StandardPage
      currentPath="/key.html"
      title={page.data.title}
      subtitle={page.data.subtitle}
    >
      <article className="content" dangerouslySetInnerHTML={{ __html: page.html }} />
    </StandardPage>
  );
}
