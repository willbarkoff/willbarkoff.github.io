import type { ReactNode } from 'react';
import { Footer } from './Footer';
import { Nav } from './Nav';

interface StandardPageProps {
  currentPath: string;
  title: string;
  subtitle?: string | undefined;
  children: ReactNode;
}

export function StandardPage({ currentPath, title, subtitle, children }: StandardPageProps) {
  return (
    <>
      <Nav currentPath={currentPath} />
      <section className="page-hero">
        <div className="container">
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </section>
      <main className="section">
        <div className="container">{children}</div>
      </main>
      <Footer />
    </>
  );
}

interface PostPageProps {
  title: string;
  dateText: string;
  children: ReactNode;
  footer: ReactNode;
}

export function PostPage({ title, dateText, children, footer }: PostPageProps) {
  return (
    <>
      <Nav />
      <section className="page-hero">
        <div className="container">
          <h1>{title}</h1>
          <p>{dateText}</p>
        </div>
      </section>
      <main className="section">
        <div className="container post-content">{children}</div>
      </main>
      {footer}
      <Footer />
    </>
  );
}

interface BigPageProps {
  title: string;
  subtitle: string;
}

export function BigPage({ title, subtitle }: BigPageProps) {
  return (
    <>
      <Nav transparent currentPath="/404" />
      <section className="page-hero big">
        <div className="container center">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </section>
      <Footer />
    </>
  );
}
