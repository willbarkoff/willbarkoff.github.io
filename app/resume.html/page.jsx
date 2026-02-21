import { StandardPage } from '@/app/_components/LayoutSections';
import { getRawPage } from '@/lib/pages';

const page = getRawPage('resume.html');

export const metadata = {
  title: page.data.title,
  robots: {
    index: false,
    follow: false
  }
};

export default function ResumeHtmlPage() {
  return (
    <StandardPage currentPath="/resume.html" title={page.data.title}>
      <div className="content" dangerouslySetInnerHTML={{ __html: page.content }} />
    </StandardPage>
  );
}
