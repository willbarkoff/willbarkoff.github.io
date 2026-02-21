import { footerProjects, footerResources, site, socialLinks } from '@/lib/site-data';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <h2>{site.title}</h2>
          <p>{site.tagline}</p>
          <div className="footer-social">
            {socialLinks.map((link) => (
              <a key={link.url} href={link.url} rel="me" aria-label={link.username}>
                <i className={link.icon} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3>Projects</h3>
          <ul>
            {footerProjects.map((project) => (
              <li key={project.url}>
                <a href={project.url}>{project.name}</a>
              </li>
            ))}
            <li>
              <a href="/#projects">More...</a>
            </li>
          </ul>
        </div>

        <div>
          <h3>Resources</h3>
          <ul>
            {footerResources.map((resource) => (
              <li key={resource.url}>
                <a href={resource.url}>{resource.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="footer-fine-print">
        Site content is open source. Suggest edits in the repository and reach out by email for anything else.
      </p>
    </footer>
  );
}
