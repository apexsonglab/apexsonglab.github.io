import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'About', href: getPermalink('/') },
    { text: 'Publications', href: getPermalink('/publications') },
    { text: 'Team', href: getPermalink('/team') },
    { text: 'Join us', href: getPermalink('/join') },
    { text: 'News', href: getPermalink('/news') },
  ],
  actions: [],
};

export const footerData = {
  // No footer link columns; navigation lives in the header.
  links: [],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'Email', icon: 'tabler:mail', href: 'mailto:asong2@mdanderson.org' },
    {
      ariaLabel: 'Google Scholar',
      icon: 'tabler:school',
      href: 'https://scholar.google.com/citations?user=1UNlyTcAAAAJ',
    },
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/in/andrewhsong' },
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/GreatAndrew90' },
  ],
  footNote: `
    APEX Lab · Department of Translational Molecular Pathology, UT MD Anderson Cancer Center, Houston, TX.
  `,
};
