import { StandardPage } from '@/app/_components/LayoutSections';
import { getRawPage } from '@/lib/pages';

const page = getRawPage('contact.html');

export const metadata = {
  title: page.data.title
};

export default function ContactHtmlPage() {
  const content = page.content.replace('href="/key"', 'href="/key.html"');

  return (
    <StandardPage
      currentPath="/contact.html"
      title={page.data.title}
      subtitle={page.data.subtitle}
    >
      <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
    </StandardPage>
  );
}
