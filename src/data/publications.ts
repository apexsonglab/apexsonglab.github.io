import { parseBibtex, groupByYear } from '~/utils/bibtex';

// `papers.bib` is the source of truth for the publication list — edit that file
// to add or change a paper. It is read at build time, so nothing else to update.
import bibliography from './papers.bib?raw';

export type { Publication, PublicationAuthor, PublicationLink } from '~/utils/bibtex';

export const publications = parseBibtex(bibliography);

// Everything from 2021 and earlier shares a single trailing section, so the
// recent years stay scannable. Change `lumpUpTo` to move the cut-off.
export const publicationsByYear = () => groupByYear(publications, { lumpUpTo: 2021, lumpLabel: 'Before 2021' });
