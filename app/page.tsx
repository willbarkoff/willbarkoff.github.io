import Link from 'next/link';
import { Footer } from './_components/Footer';
import { Nav } from './_components/Nav';
import { experiences } from '@/content/experiences';
import { renderMarkdownToReact } from '@/lib/markdown';
import { getRecentPosts } from '@/lib/posts';
import { site } from '@/lib/site-data';
import type { Experience } from '@/lib/types';

interface ExperienceCardProps {
  experience: Experience;
}

function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <article className={`experience-card ${experience.style}`}>
      {experience.image ? (
        <a href={experience.image} className="experience-image-wrap">
          <img src={experience.image} alt={experience.title} className="experience-image" />
        </a>
      ) : null}

      <div>
        <h3>{experience.title}</h3>
        {experience.subtitle ? <p className="muted">{experience.subtitle}</p> : null}

        {experience.awards?.map((award) => (
          <p key={award} className="small-row">
            <i className="fas fa-trophy" /> {award}
          </p>
        ))}

        {experience.collaborators?.map((collab) => (
          <p key={`${experience.title}-${collab.name}`} className="small-row">
            <i className="fas fa-users" /> Collaborated with{' '}
            {collab.url ? <a href={collab.url}>{collab.name}</a> : collab.name}
          </p>
        ))}

        {experience.skills.length ? (
          <p className="skills">
            {experience.skills.map((skill) => (
              <span key={`${experience.title}-${skill}`}>{skill}</span>
            ))}
          </p>
        ) : null}

        <p>{experience.description}</p>

        {experience.links?.length ? (
          <div className="link-row">
            {experience.links.map((link) => (
              <a className="pill" key={`${experience.title}-${link.url}`} href={link.url}>
                {link.text}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default async function HomePage() {
  const posts = await getRecentPosts(3);
  const postsWithExcerptContent = await Promise.all(
    posts.map(async (post) => ({
      ...post,
      excerptContent: await renderMarkdownToReact(post.excerptSource)
    }))
  );

  return (
    <>
      <Nav currentPath="/" />

      <header className="home-hero">
        <div className="container hero-grid">
          <div>
            <h1>👋 Hi</h1>
            <p>{site.tagline}</p>
          </div>

          <aside className="contact-card">
            <ul>
              <li>
                <i className="fas fa-fw fa-map-pin" /> New York, NY
              </li>
              <li>
                <i className="fas fa-fw fa-envelope" />{' '}
                <a href="mailto:william@barkoffusa.com">william@barkoffusa.com</a>
              </li>
              <li>
                <i className="fab fa-fw fa-github" /> <a href="https://github.com/willbarkoff">@willbarkoff</a>
              </li>
              <li>
                <i className="fab fa-fw fa-twitter" /> <a href="https://twitter.com/willbarkoff">@willbarkoff</a>
              </li>
              <li>
                <i className="fas fa-fw fa-key" /> <a href="/key.html">PGP Key</a>
              </li>
            </ul>
          </aside>
        </div>
      </header>

      <main>
        <section className="section container">
          <h2>What I&apos;ve written recently</h2>
          <div className="post-grid">
            {postsWithExcerptContent.map((post) => (
              <article key={post.url} className="post-card">
                <h3>
                  <Link href={post.url}>{post.title}</Link>
                </h3>
                <div>{post.excerptContent}</div>
              </article>
            ))}
          </div>
          <p className="center-link">
            <Link href="/posts.html">More posts »</Link>
          </p>
        </section>

        <section className="section container" id="projects">
          <h2>What I&apos;ve been working on</h2>
          <div className="experience-grid">
            {experiences.map((experience) => (
              <ExperienceCard key={experience.title} experience={experience} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
