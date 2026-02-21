import { Footer } from './Footer';
import { Nav } from './Nav';

export function StandardPage({ currentPath, title, subtitle, children, narrow = false }) {
  return (
    <>
      <Nav currentPath={currentPath} />
      <section className="page-hero">
        <div className={`container ${narrow ? 'narrow' : ''}`}>
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </section>
      <main className="section">
        <div className={`container ${narrow ? 'narrow' : ''}`}>{children}</div>
      </main>
      <Footer />
    </>
  );
}

export function PostPage({ title, dateText, children, footer }) {
  return (
    <>
      <Nav />
      <section className="page-hero">
        <div className="container narrow">
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

export function BigPage({ title, subtitle }) {
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
