import type { FooterLink, NavLink, SiteMeta, SocialLink } from './types';

export const site: SiteMeta = {
  title: 'Will Barkoff',
  tagline: "I'm Will Barkoff, a software engineer in New York City.",
  accent: '#123456'
};

export const navLinks: NavLink[] = [
  { title: 'Home', url: '/' },
  { title: 'Posts', url: '/posts.html' }
];

export const socialLinks: SocialLink[] = [
  {
    icon: 'fas fa-envelope',
    url: 'mailto:william@barkoffusa.com',
    username: 'william@barkoffusa.com'
  },
  {
    icon: 'fab fa-twitter',
    url: 'https://twitter.com/willbarkoff',
    username: '@willbarkoff'
  },
  {
    icon: 'fab fa-github',
    url: 'https://github.com/willbarkoff',
    username: '@willbarkoff'
  },
  {
    icon: 'fab fa-linkedin-in',
    url: 'https://linkedin.com/in/willbarkoff',
    username: 'LinkedIn'
  },
  {
    icon: 'fas fa-key',
    url: '/key.html',
    username: 'PGP Key'
  }
];

export const footerProjects: FooterLink[] = [
  { name: 'MyHomeworkSpace', url: 'https://myhomework.space' },
  { name: 'Honor with Code', url: 'https://honorwithcode.org' }
];

export const footerResources: FooterLink[] = [
  {
    name: 'Website Source Code',
    url: 'https://github.com/willbarkoff/willbarkoff.github.io'
  },
  { name: 'Contact Me', url: '/contact.html' },
  { name: 'PGP Key', url: '/key.html' }
];
