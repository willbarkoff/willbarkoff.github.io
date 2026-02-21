import { StandardPage } from '@/app/_components/LayoutSections';
import { getMarkdownPage } from '@/lib/pages';

export const metadata = {
  title: 'PGP Key'
};

export default async function KeyHtmlPage() {
  const page = await getMarkdownPage('key.md');

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
