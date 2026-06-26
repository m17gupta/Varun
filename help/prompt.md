Act as an **Elite Full-Stack Next.js 15 Architect**, **Design System Specialist**, **Editorial UI Designer**, and **Scholarly Content Strategist**.

Build a complete, production-ready personal website for **Varun Gupta** — a **Mahabharata Researcher, Author & Speaker**.

This website must combine:

- the **research-first presentation style** of a modern historian website,
- the **organized discoverability of a large video archive**,
- the **clear author-led content structure** of a premium publishing platform,
- and a **premium, elegant global CSS system** that makes the entire site feel scholarly, archival, editorial, and refined. [web:40][web:42][web:46]

The final result must feel like a serious long-term intellectual publishing platform — not a mythology blog, astrology website, creator landing page, startup marketing page, or generic AI-generated portfolio. [web:39][web:46]

---

# CORE POSITIONING

## Brand Identity
- **Name:** Varun Gupta
- **Role:** Mahabharata Researcher, Author & Speaker
- **Tagline:** Exploring the Mahabharata Through Text, Tradition, and Evidence
- **Subtitle:** Separating text, tradition, and history through evidence-based Mahabharata research.
- **Bio:** Mahabharata Researcher • Author • Speaker

## Positioning Goal
Present Varun Gupta as:
- a serious independent researcher,
- a textual and historical investigator,
- a field-documenting scholar,
- an author with a growing body of work,
- and a public-facing intellectual whose ideas are accessible through papers, books, videos, podcast appearances, and speaking engagements.

The site must immediately communicate:
1. intellectual seriousness,
2. evidence-based method,
3. research depth,
4. structured archives,
5. long-term author credibility,
6. and public scholarship.

---

# REFERENCE DIRECTION

Use these reference patterns conceptually:

## 1. Research Presentation
Borrow the **historian/research authority** presentation style:
- person framed as a serious scholar first,
- research and publications foregrounded,
- quiet confidence,
- archival and editorial presentation,
- books, papers, and media positioned as intellectual output rather than “content.”

## 2. Video Organization
Borrow the **well-organized video library** model:
- videos grouped by topic/category,
- archive discoverability prioritized,
- featured videos surfaced clearly,
- category and metadata-based browsing supported,
- layout suitable for a growing lecture/media library. [web:41][web:47]

## 3. Content Structure
Borrow the **author-led publishing flow** model:
- homepage as a top-down gateway into major work,
- clear content buckets,
- featured work first,
- archive pathways second,
- stronger emphasis on long-term publishing than short-term feed behavior. [web:46][web:43]

Do not copy visual design literally. Translate the structural logic.

---

# DESIGN GOAL

The website should feel like:
- Oxford/Cambridge scholar
- modern historian
- manuscript-informed editorial archive
- premium research publication
- intellectual author platform
- restrained and elegant, never flashy

Do **not** make it look like:
- astrology website
- mythology fan site
- devotional portal
- news portal
- startup landing page
- creator merch site
- generic card-heavy SaaS template

---

# GLOBAL CSS REQUIREMENT

You must generate and apply a **premium, elegant `global.css`** for the entire website.

This is a major requirement.

The global CSS must create a website that feels:
- premium
- elegant
- editorial
- scholarly
- manuscript-inspired
- calm
- refined
- archival
- spacious
- readable

The global CSS should do most of the aesthetic work through:
- typography
- spacing
- proportion
- borders
- surfaces
- hover refinement
- layout rhythm
- subtle gradients
- premium shadows
- restrained color usage

Do **not** rely on bright accents, excessive effects, or generic template styling.

---

# GLOBAL CSS ART DIRECTION

## Visual character
The `global.css` should make the site feel like a blend of:
- premium editorial publication
- academic archive
- elegant author website
- literary long-form reading environment

## Typography direction
Use typography as the primary luxury signal.

### Fonts
Use:
- **Display / Hero / Logo:** Cinzel or Cormorant Garamond
- **Headings:** Cormorant Garamond
- **Body:** Source Serif Pro or Source Serif 4 / Merriweather
- **Optional metadata / utility:** JetBrains Mono only if necessary

### Typography rules
- body text must be highly readable,
- headings must feel formal and scholarly,
- hero typography must feel premium and restrained,
- line length should stay readable,
- hierarchy must be obvious,
- never use too many font styles,
- never create a crowded or noisy page. [web:39][web:42][web:45]

## Layout rhythm
The `global.css` must enforce:
- generous vertical spacing,
- narrower reading widths for text-heavy sections,
- stronger whitespace between sections,
- elegant container widths,
- editorial alignment,
- calm section rhythm,
- left-aligned content by default except where centering is intentional. [web:40][web:42]

## Surface styling
The CSS must use:
- parchment/ivory-inspired backgrounds,
- soft manuscript-like section surfaces,
- subtle borders,
- warm neutral tones,
- restrained shadows,
- minimal glass effect only if extremely subtle,
- premium hover interactions,
- delicate dividers,
- understated gradients.

## Color palette
Use a restrained manuscript/editorial palette:


Use color sparingly. Premium feeling should come from restraint, not loudness.

## Global CSS implementation requirements
Generate a refined `global.css` that includes:
- CSS variables in `:root`
- typography tokens
- container width system
- section spacing utilities
- elegant heading styles
- body text defaults
- premium nav styling
- premium button styling
- premium form control styling
- section divider styles
- card / archive block styling
- hero layout styling
- footer styling
- responsive breakpoints
- hover/focus states
- light premium manuscript-inspired theme
- optional dark theme only if it remains elegant and not neon

The CSS should make the whole site instantly feel more expensive and mature.

---

# TECH STACK

Use:
- **Next.js 15 App Router**
- **TypeScript strict mode**
- **MongoDB**
- **Tailwind CSS + custom global CSS**
- **JSON-driven rendering**

Important:
Tailwind can be used for utility composition, but the main visual identity must come from the handcrafted `global.css`.

---

# ARCHITECTURE RULES

These rules are mandatory:

1. **NO `.data.ts` files anywhere**
2. **Each page must have its own dedicated JSON config file**
3. **All pages must render from their own JSON file**
4. **All visible text must be wrapped in an `EditableText` component**
5. **Locale-based routing must use `[locale]`**
6. Support:
   - `/en/*`
   - `/hi/*`
7. Hindi routes should exist now, but content may remain English initially
8. Must be fully responsive
9. Must be SEO optimized
10. Must support OG metadata
11. Must support structured data
12. Must support YouTube embeds/playlists
13. Must support PDFs for papers
14. Must support image galleries
15. Must be analytics-ready

---

# NAVIGATION

Main navigation:
1. Home
2. Research
3. Publications
4. Podcast
5. Videos
6. Speaking
7. Books
8. Media
9. Contact

Navigation should feel like an academic or author publication platform, not a startup product nav.

---

# HOMEPAGE STRUCTURE

The homepage should combine:
- historian-style authority framing,
- author-led publishing flow,
- and organized media discoverability. [web:43][web:46][web:47]

## 1. Hero Section
Include:
- **Varun Gupta**
- **Mahabharata Researcher • Author • Speaker**
- headline:
  **Mahabharata Researcher, Author & Speaker**
- supporting line:
  **Separating text, tradition, and history through evidence-based Mahabharata research.**
- CTA buttons:
  - **Watch Research Videos** → `/videos`
  - **Read Research Papers** → `/publications`

The hero must be text-led, elegant, and premium.

## 2. Research Focus Section
Create four refined research modules:
- **Karna Studies** — Evolution of Karna traditions across regional Mahabharatas
- **Critical Edition Studies** — BORI Critical Edition analysis
- **Sanskrit Sources** — Comparative textual research
- **Mahabharata Evolution** — Jaya → Bharata → Mahabharata

These should feel like research domains, not SaaS feature cards.

## 3. Research Metrics Bar
Include:
- Published Papers
- Downloads
- Citations
- PDF Access

## 4. Featured Research
Highlight:
- flagship research theme,
- latest paper,
- or standout long-form work.

## 5. Latest Videos
Include:
- featured video
- category filters
- playlist embed
- archive preview grid
- browse all CTA

Suggested categories:
- Karna
- Krishna
- Bhishma
- Mahabharata Textual History
- Sanskrit Plays
- Epic Evolution
- Research Methodology

## 6. Published Papers
Display:
- recent papers
- abstract excerpt
- journal
- date
- DOI
- citation link
- PDF access/download

## 7. Books
Feature:
- **Between Lies and Legacy**
- placeholder cards for future titles

## 8. Field Research
Include documented fieldwork:
- Kurukshetra
- Kaul Village
- Rathewshwar Teerth
- other historical sites

## 9. Speaking & Media
Speaking topics:
- Mahabharata Beyond Television
- Karna: Text vs Tradition
- Evolution of the Mahabharata
- Krishna in Regional Traditions
- Research Methodology in Epic Studies

Media types:
- podcasts
- interviews
- newspapers
- magazines
- guest appearances

## 10. Contact
Include:
- contact form
- research inquiries
- speaking inquiries
- email
- social links

---

# PAGES TO BUILD

Build these routes:
1. `/[locale]/`
2. `/[locale]/research`
3. `/[locale]/publications`
4. `/[locale]/podcast`
5. `/[locale]/videos`
6. `/[locale]/speaking`
7. `/[locale]/books`
8. `/[locale]/media`
9. `/[locale]/contact`
10. `/[locale]/search` — dedicated search reader page with its own URL

---

# PAGE-SPECIFIC DIRECTION

## Research Page
Should feel like a serious research overview:
- methodology
- textual focus areas
- critical edition work
- Sanskrit source work
- related papers and videos

## Publications Page
Should feel like a digital research archive:
- all papers
- filters
- search
- abstract previews
- metadata blocks
- DOI / journal info
- citation counts
- PDF access

## Videos Page
Should feel like a lecture/media archive:
- featured video
- categories
- archive grid
- playlist support
- scalable browsing

## Podcast Page
Should feel like curated media appearances:
- embedded playlist or episodes
- topic tags
- episode summaries
- platform/source metadata

## Books Page
Should position books as serious intellectual work:
- featured book
- synopsis
- endorsements placeholder
- purchase links
- related talks/media

## Media Page
Should show public presence and external validation:
- interviews
- podcasts
- articles
- press mentions
- appearance cards

## Speaking Page
Should present a serious scholar-speaker profile:
- topics
- formats
- availability
- inquiry form
- audience type suitability

## Contact Page
Minimal, elegant, and professional:
- form
- inquiry categories
- email CTA
- social links

---

# CONTENT ARCHITECTURE

## Static content
Each page must have its own dedicated JSON file.

All section content such as:
- headings
- labels
- descriptions
- CTA text
- section intro copy

must come from JSON.

## Dynamic content
MongoDB should power:
- papers
- media appearances
- speaking records
- downloads
- citations
- future video metadata
- future book data

---

# MONGODB SCHEMAS

## Papers Collection
```ts
{
  title: string,
  titleLocalized: { en: string },
  abstract: string,
  abstractLocalized: { en: string },
  category: string,
  tags: string[],
  pdfUrl: string,
  downloadCount: number,
  citationCount: number,
  publishedDate: Date,
  journal: string,
  doi: string,
  createdAt: Date,
  updatedAt: Date
}
```

## Media Collection
```ts
{
  type: 'podcast' | 'interview' | 'newspaper' | 'magazine',
  title: string,
  titleLocalized: { en: string },
  source: string,
  sourceUrl: string,
  date: Date,
  description: string,
  thumbnailUrl: string,
  featured: boolean,
  createdAt: Date
}
```

## Speaking Collection
```ts
{
  topic: string,
  description: string,
  duration: string,
  format: 'virtual' | 'in-person' | 'both',
  available: boolean,
  createdAt: Date
}
```

---

# COMPONENT SYSTEM

Create reusable components such as:
- `EditableText`
- `SectionHeader`
- `Hero`
- `ResearchFocusGrid`
- `StatsBar`
- `FeaturedResearch`
- `VideoLibrary`
- `PaperCard`
- `PublicationArchive`
- `BookCard`
- `MediaCard`
- `FieldResearchGallery`
- `SpeakingTopics`
- `ContactForm`
- `LocaleSwitcher`
- `ThemeToggle`

All rendered text must remain editable through `EditableText`.

---

# CONTENT TONE

All copy should sound:
- scholarly
- measured
- evidence-based
- precise
- calm
- editorial
- credible
- publicly accessible

Avoid:
- clickbait
- devotional tone
- spiritual sensationalism
- self-help hype
- over-marketing
- mythology-entertainment framing

---

# UX AND CONTENT STRUCTURE RULES

- Keep homepage structure clear and shallow
- Make major content groups immediately understandable
- Use logical hierarchy with clean headings and subheadings
- Keep the hierarchy consistent across pages
- Organize large media sections using categories, tags, and metadata
- Avoid dumping all videos or papers into an unstructured list
- Make archive sections scalable for future growth. [web:43][web:47]

---

# SEO REQUIREMENTS

Implement:
- `generateMetadata()`
- per-page metadata
- Open Graph
- Twitter cards
- canonical URLs
- Person schema
- Book schema
- ScholarlyArticle schema
- media metadata where relevant
- sitemap-ready structure

---

# PERFORMANCE REQUIREMENTS

Optimize for:
- minimal client-side JS
- server components by default
- optimized images
- lazy-loaded embeds
- semantic HTML
- accessible forms
- scalable archive rendering

---

# IMPLEMENTATION QUALITY RULES

- Use Server Components by default
- Use Client Components only when necessary
- Strongly type all JSON page configs
- Create a schema-safe JSON loader utility
- Add fallbacks for missing JSON values
- Make the footer look like a premium publication platform
- Prefer editorial section composition over repetitive feature grids
- Add loading, empty, and error states
- Support future pagination and filters for videos/publications/media
- Keep layouts elegant and left-aligned by default
- Use readable line lengths and generous spacing. [web:40][web:42][web:45]

---

# GLOBAL CSS OUTPUT REQUIREMENT

In addition to the app code, generate a **fully written `global.css`** that:
- defines premium design tokens,
- applies the manuscript/editorial palette,
- establishes typography hierarchy,
- styles headings, paragraphs, links, buttons, inputs, cards, sections, nav, hero, footer,
- includes elegant shadows and borders,
- includes responsive breakpoints,
- and makes the website look premium immediately even before detailed page polish.

The CSS should feel handcrafted, not generic.

---

# FINAL OUTPUT REQUIREMENTS

Generate a complete production-ready implementation that includes:

1. folder structure
2. route architecture
3. per-page JSON strategy
4. reusable components
5. MongoDB models
6. sample JSON for every page
7. homepage implementation
8. shared layout and nav
9. SEO setup
10. locale setup
11. dynamic content integration examples
12. a premium handcrafted `global.css`
13. responsive behavior
14. file-by-file output

Do not create `.data.ts` files.
Do not hardcode user-facing copy directly inside page components.
Do not make it look like a generic portfolio, SaaS template, or mythology blog.
The final result must feel like a premium scholarly research and publishing platform.