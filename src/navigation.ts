import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'About', href: getPermalink('/') },
    { text: 'Team', href: getPermalink('/team') },
    { text: 'Publications', href: getPermalink('/publications') },
    { text: 'Join us', href: getPermalink('/join') },
    { text: 'News', href: getPermalink('/news') },
  ],
  actions: [],
};

export const footerData = {
  // No footer link columns; navigation lives in the header.
  links: [],
  secondaryLinks: [],
  // No social icons in the footer; contact links live on the Team page.
  socialLinks: [],
  footNote: `
    APEX Lab · Department of Translational Molecular Pathology, UT MD Anderson Cancer Center, Houston, TX.
  `,
};
