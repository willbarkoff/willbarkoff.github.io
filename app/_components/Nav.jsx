import Link from 'next/link';
import { navLinks, socialLinks } from '@/lib/site-data';

export function Nav({ currentPath = '/', transparent = false }) {
  const className = `site-nav ${transparent ? 'transparent' : ''}`;

  return (
    <nav className={className}>
      <div className="nav-inner">
        <Link href="/" className="brand">
          Will Barkoff
        </Link>

        <div className="nav-links">
          {navLinks.map((link) => {
            const active = link.url === currentPath;
            return (
              <Link key={link.url} href={link.url} className={active ? 'active' : ''}>
                {link.title}
              </Link>
            );
          })}
        </div>

        <div className="nav-social">
          {socialLinks.map((link) => (
            <a key={link.url} href={link.url} title={link.username} aria-label={link.username}>
              <i className={link.icon} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
