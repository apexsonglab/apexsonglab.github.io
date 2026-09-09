/**
 * Minimal BibTeX reader for the lab's publication list.
 *
 * Runs at build time over `src/data/papers.bib`, so that file stays the single
 * source of truth — add a paper there and it appears on the site.
 *
 * Conventions carried over from the group's bibliography:
 *  - a `*`, `+` or `†` suffix on an author's surname marks co-first /
 *    co-second / co-senior authorship (`Song*, Andrew H`);
 *  - `html`, `pdf`, `arxiv`, `github`, `video`, `press` and `blog` fields
 *    become the link row under an entry;
 *  - `preview` (thumbnail) fields are ignored on purpose.
 */

export interface PublicationAuthor {
  name: string;
  mark?: string;
  /** The lab PI, rendered in bold. */
  isPI?: boolean;
}

export interface PublicationLink {
  label: string;
  href: string;
}

export interface Publication {
  key: string;
  title: string;
  authors: PublicationAuthor[];
  venue: string;
  year: string;
  links: PublicationLink[];
}

const ACCENTS: Record<string, string> = {
  "{\\'e}": 'é',
  "{\\'{e}}": 'é',
  "{\\'a}": 'á',
  "{\\'o}": 'ó',
  "{\\'i}": 'í',
  "{\\'u}": 'ú',
  '{\\"o}': 'ö',
  '{\\"u}': 'ü',
  '{\\"a}': 'ä',
  '{\\c c}': 'ç',
  '{\\~n}': 'ñ',
  '{\\v s}': 'š',
};

/** Journal/booktitle strings the source bibliography spells inconsistently. */
const VENUE_FIXES: Record<string, string> = {
  'Clinical neurophysiology': 'Clinical Neurophysiology',
  'International conference of the ieee engineering in medicine and biology society (EMBC)':
    'IEEE Engineering in Medicine and Biology Society (EMBC)',
  'The Thirty-eight Conference on Neural Information Processing Systems Datasets and Benchmarks Track':
    'Neural Information Processing Systems (NeurIPS), Datasets and Benchmarks Track',
};

const LINK_FIELDS = ['html', 'pdf', 'arxiv', 'github', 'video', 'press', 'blog'] as const;

const LINK_LABELS: Record<(typeof LINK_FIELDS)[number], string> = {
  html: 'Paper',
  pdf: 'PDF',
  arxiv: 'arXiv',
  github: 'Code',
  video: 'Video',
  press: 'Press',
  blog: 'Blog',
};

const clean = (value: string): string => {
  let out = value.trim();
  for (const [latex, char] of Object.entries(ACCENTS)) out = out.split(latex).join(char);
  out = out.replace(/\\&/g, '&').replace(/\\%/g, '%');
  out = out.replace(/[{}]/g, '');
  return out.replace(/\s+/g, ' ').trim().replace(/,$/, '').trim();
};

/** Split the file into `@type{key, …}` records, respecting nested braces. */
const splitEntries = (text: string): Array<{ key: string; body: string }> => {
  const entries: Array<{ key: string; body: string }> = [];
  const start = /@(\w+)\s*\{/g;
  let match: RegExpExecArray | null;

  while ((match = start.exec(text))) {
    let depth = 1;
    let i = match.index + match[0].length;
    while (i < text.length && depth > 0) {
      if (text[i] === '{') depth++;
      else if (text[i] === '}') depth--;
      i++;
    }
    const body = text.slice(match.index + match[0].length, i - 1);
    const comma = body.indexOf(',');
    entries.push({
      key: comma === -1 ? body.trim() : body.slice(0, comma).trim(),
      body: comma === -1 ? '' : body.slice(comma + 1),
    });
    start.lastIndex = i;
  }
  return entries;
};

/** Read `field = {value}` / `field = "value"` / `field = value` pairs. */
const parseFields = (body: string): Record<string, string> => {
  const fields: Record<string, string> = {};
  const name = /\s*([A-Za-z_][\w-]*)\s*=\s*/y;
  let i = 0;

  while (i < body.length) {
    name.lastIndex = i;
    const match = name.exec(body);
    if (!match) {
      i++;
      continue;
    }

    let j = name.lastIndex;
    let value: string;

    if (body[j] === '{') {
      let depth = 1;
      j++;
      const from = j;
      while (j < body.length && depth > 0) {
        if (body[j] === '{') depth++;
        else if (body[j] === '}') depth--;
        j++;
      }
      value = body.slice(from, j - 1);
    } else if (body[j] === '"') {
      j++;
      const from = j;
      while (j < body.length && body[j] !== '"') j++;
      value = body.slice(from, j);
      j++;
    } else {
      const from = j;
      while (j < body.length && body[j] !== ',') j++;
      value = body.slice(from, j);
    }

    fields[match[1].toLowerCase()] = value;

    while (j < body.length && /\s/.test(body[j])) j++;
    if (body[j] === ',') j++;
    i = j;
  }
  return fields;
};

const parseAuthors = (raw: string): PublicationAuthor[] => {
  if (!raw.trim()) return [];

  // One source entry contains a stray doubled "and"; collapse it first.
  const normalised = raw.trim().replace(/\s+and(\s+and)+\s+/g, ' and ');

  return normalised
    .split(/\s+and\s+/)
    .map((chunk) => chunk.trim().replace(/,$/, '').trim())
    .filter(Boolean)
    .map((chunk) => {
      if (/^(others|et al\.?)$/i.test(chunk)) return { name: 'et al.' };

      let last: string;
      let first: string;
      const comma = chunk.indexOf(',');
      if (comma !== -1) {
        last = chunk.slice(0, comma);
        first = chunk.slice(comma + 1);
      } else {
        const space = chunk.lastIndexOf(' ');
        last = space === -1 ? chunk : chunk.slice(space + 1);
        first = space === -1 ? '' : chunk.slice(0, space);
      }

      last = clean(last);
      first = clean(first);

      let mark = '';
      while (last.endsWith('*') || last.endsWith('+') || last.endsWith('†')) {
        mark = last.slice(-1) + mark;
        last = last.slice(0, -1).trim();
      }

      const author: PublicationAuthor = { name: `${first} ${last}`.trim() };
      if (mark) author.mark = mark;
      if (last === 'Song' && first.startsWith('Andrew')) author.isPI = true;
      return author;
    });
};

const parseLinks = (fields: Record<string, string>): PublicationLink[] => {
  const links: PublicationLink[] = [];
  for (const field of LINK_FIELDS) {
    const raw = fields[field];
    if (!raw?.trim()) continue;

    let href = clean(raw);
    if (field === 'arxiv' && !href.startsWith('http')) href = `https://arxiv.org/abs/${href}`;
    if (!href.startsWith('http')) continue; // local assets aren't published here

    links.push({ label: LINK_LABELS[field], href });
  }
  return links;
};

export const parseBibtex = (source: string): Publication[] => {
  // Drop the Jekyll front matter, if a copy still carries it.
  const text = source.replace(/^---\s*\n---\s*\n/, '');

  return splitEntries(text)
    .map(({ key, body }) => {
      const fields = parseFields(body);
      if (!fields.title) return null;

      const venue = clean(fields.journal ?? fields.booktitle ?? '');

      return {
        key,
        title: clean(fields.title),
        authors: parseAuthors(fields.author ?? ''),
        venue: VENUE_FIXES[venue] ?? venue,
        year: clean(fields.year ?? ''),
        links: parseLinks(fields),
      } satisfies Publication;
    })
    .filter((entry): entry is Publication => entry !== null);
};

export interface PublicationGroup {
  /** Stable anchor id, e.g. "2026" or "earlier". */
  id: string;
  /** Heading shown above the group. */
  label: string;
  items: Publication[];
}

export interface GroupOptions {
  /** Years at or below this are collected into a single trailing group. */
  lumpUpTo?: number;
  /** Heading for that trailing group. */
  lumpLabel?: string;
}

/**
 * Publications grouped for display: newest year first, source order within a
 * year. Older work is optionally collapsed into one trailing group so the
 * recent years stay scannable.
 */
export const groupByYear = (publications: Publication[], options: GroupOptions = {}): PublicationGroup[] => {
  const { lumpUpTo, lumpLabel = 'Earlier' } = options;

  const years = new Map<string, Publication[]>();
  const older: Publication[] = [];

  for (const publication of publications) {
    if (lumpUpTo !== undefined && Number(publication.year) <= lumpUpTo) {
      older.push(publication);
      continue;
    }
    const bucket = years.get(publication.year);
    if (bucket) bucket.push(publication);
    else years.set(publication.year, [publication]);
  }

  const groups: PublicationGroup[] = [...years.entries()]
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([year, items]) => ({ id: year, label: year, items }));

  if (older.length > 0) {
    older.sort((a, b) => Number(b.year) - Number(a.year));
    groups.push({ id: 'earlier', label: lumpLabel, items: older });
  }

  return groups;
};
