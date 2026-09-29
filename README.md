# Aretus Enterprises website

Marketing site for Aretus Enterprises, an Odisha transport and construction fleet company.

- **Frontend:** Next.js 16 (App Router), Tailwind CSS v4, Framer Motion, Lenis smooth scroll
- **3D:** React Three Fiber scenes with optimised GLB models of the fleet (`public/models`)
- **Video:** Remotion compositions rendered to `public/video`
- **CMS:** Sanity, with a standalone Studio in `studio/`

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in what you have; see below
npm run dev                  # http://localhost:3000
```

Without Sanity credentials the site runs on the built-in content in `src/content/data.ts`, so it always renders.

## Environment variables

| Variable | Needed for |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, structured data |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` | Reading content from Sanity |
| `SANITY_API_READ_TOKEN` | Live content, drafts and visual editing |
| `SANITY_API_WRITE_TOKEN` | Storing contact-form enquiries; seeding content |
| `SKETCHFAB_API_TOKEN` | Re-downloading the source 3D models (optional) |
| `PEXELS_API_KEY` | Finding more stock photos (optional) |

Never commit `.env.local`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` / `build` / `start` | Next.js |
| `npm run studio` | Sanity Studio at http://localhost:3333 (run `npm install` in `studio/` first) |
| `npm run seed` | Loads all site content and client logos into Sanity (idempotent) |
| `npm run video:render` | Renders the Remotion videos into `public/video` |
| `npm run remotion` | Opens Remotion Studio to edit the videos |
| `npm run models:fetch` / `models:optimize` | Downloads and optimises the Sketchfab GLBs |

## Project layout

```
src/app/(site)/        pages
src/components/        layout, sections, motion primitives, three.js scenes, UI
src/content/           content types, local content, photo library, map coordinates
src/sanity/            Sanity client, queries, live content
src/remotion/          video compositions
studio/                Sanity Studio (schemas, desk structure, presentation)
public/brand/          logo files
```

## Brand

The mark is an "A" whose crossbar is a dashed road centre line, on a signal-yellow badge (`public/brand/aretus-mark.svg`). Colours: charcoal `#111417`, steel `#3E5C76`, dust `#E8E4DC`, signal `#F2B705`. Type: Archivo (headings and body) and IBM Plex Mono (labels).

## Credits and licences

3D models are CC BY 4.0 and credited on `/credits`. Stock photography is under the Pexels License. Client logos belong to their respective owners.
