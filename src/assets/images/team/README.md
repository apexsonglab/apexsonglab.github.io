# Team photos

Drop each lab member's photo in this folder and reference the file name from the
`members` array in `src/pages/team.astro`:

```ts
{
  name: 'Huilin Tai',
  photo: 'huilin-tai.jpg',   // <- this file name
  href: 'https://haleyyy2001.github.io/',
  ...
}
```

- **Formats**: `.jpg`, `.jpeg`, `.png`, `.webp` or `.avif`.
- **Size**: roughly portrait (4:5) and at least 640px wide. Astro resizes,
  crops and converts to WebP at build time, so there is no need to optimize
  by hand — but keep the original under ~1 MB.
- A member with no `photo` (or whose file is missing) falls back to a monogram,
  so it is safe to add people before their picture arrives.
