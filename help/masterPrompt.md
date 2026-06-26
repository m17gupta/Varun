# ◈ MASTER PROMPT — Varun Gupta Scholar Website

> **Role:** Elite Full-Stack Next.js 15 Architect · Design System Specialist · Editorial UI Designer · Scholarly Content Strategist
>
> **Mission:** Build a complete, production-ready personal website for **Varun Gupta** — a *Mahabharata Researcher, Author & Speaker* — that functions as a serious long-term intellectual publishing platform.

---

## ❯ PART I — BRAND & POSITIONING

### 1.1 Identity

| Field | Value |
|-------|-------|
| **Name** | Varun Gupta |
| **Role** | Mahabharata Researcher, Author & Speaker |
| **Tagline** | *Exploring the Mahabharata Through Text, Tradition, and Evidence* |
| **Subtitle** | Separating text, tradition, and history through evidence-based Mahabharata research. |

### 1.2 Positioning Goal

Present Varun Gupta as:

- a serious **independent researcher** and textual investigator,
- a **field-documenting scholar** with real-world site documentation,
- an **author** with a growing body of work,
- a **public-facing intellectual** accessible through papers, books, videos, podcast appearances, and speaking engagements.

The site must immediately communicate:

1. Intellectual seriousness
2. Evidence-based method
3. Research depth
4. Structured archives
5. Long-term author credibility
6. Public scholarship

### 1.3 Target Audience

- Readers interested in Mahabharata textual history and epic studies
- Students and researchers seeking serious, source-based material
- Podcast listeners and lecture viewers wanting structured archives
- Media hosts, festival organizers, and universities evaluating the scholar for interviews or engagements
- General educated readers who want credible research without sensationalism

---

## ❯ PART II — DESIGN PHILOSOPHY

### 2.1 Desired Feel

The website should feel like:

```
Oxford/Cambridge scholar
Modern historian
Manuscript-informed editorial archive
Premium research publication
Intellectual author platform
Restrained and elegant — never flashy
```

### 2.2 Must NOT Feel Like

```
✗ Astrology website          ✗ Mythology fan site
✗ Devotional portal          ✗ News aggregator
✗ Startup landing page       ✗ Creator merch site
✗ Generic SaaS card template ✗ Templated portfolio
✗ Spiritual influencer       ✗ Clickbait channel
```

### 2.3 Tone

| Preferred | Avoid |
|-----------|-------|
| Scholarly | Sensational |
| Measured | Devotional |
| Evidence-based | Mystical |
| Precise | Clickbait |
| Calm | Over-marketed |
| Editorial | Self-help hype |
| Trustworthy | Pseudo-spiritual |

### 2.4 Preferred Vocabulary

Use terms like:

- textual history · regional traditions · source criticism
- manuscript evidence · comparative reading · critical edition
- oral and textual transmission · philological method
- field documentation · research methodology · epic transmission

Avoid phrases like:

- *"secrets of the Mahabharata"*
- *"untold truth revealed"*
- *"spiritual wisdom unlocked"*
- *"ancient answers for modern life"*

---

## ❯ PART III — TECH STACK & ARCHITECTURE

### 3.1 Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | **Next.js 15** (App Router) |
| Language | **TypeScript** (strict mode) |
| Database | **MongoDB** |
| Styling | **Tailwind CSS** + handcrafted `global.css` |
| UI Components | **shadcn/ui** |
| Animation | **motion** (Framer Motion v11+) |
| Content | **JSON-driven rendering** |

> **Important:** Tailwind is for utility composition only. The main visual identity must come from the handcrafted `global.css`.

### 3.2 Mandatory Architecture Rules

These rules are **non-negotiable**:

1. **NO `.data.ts` files anywhere**
2. **Each page must have its own dedicated JSON config file**
3. **All pages must render from their own JSON file**
4. **All visible text must be wrapped in an `EditableText` component**
5. **Locale-based routing must use `[locale]`** — support `/en/*` and `/hi/*`
6. Hindi routes must exist now; content may remain English initially
7. Must be fully **responsive**
8. Must be fully **SEO optimized**
9. Must support **OG metadata** and **structured data**
10. Must support **YouTube embeds/playlists**
11. Must support **PDF access** for papers
12. Must support **image galleries** for field research
13. Must be **analytics-ready**
14. Use **Server Components** by default; Client Components only when necessary
15. Strongly type all JSON page configs with a schema-safe JSON loader utility
16. Add **fallbacks** for missing JSON values
17. Support future **pagination and filters** for videos, publications, and media

---

## ❯ PART IV — GLOBAL CSS SYSTEM

### 4.1 Design Vision

The `global.css` must make the site feel like a blend of:

- Premium editorial publication
- Academic archive
- Elegant author website
- Literary long-form reading environment

The CSS should feel **handcrafted, not generic**. It does most of the aesthetic work through:
`typography · spacing · proportion · borders · surfaces · hover refinement · layout rhythm · subtle gradients · premium shadows · restrained color usage`

### 4.2 Typography Direction

Typography is the **primary luxury signal**.

| Role | Font |
|------|------|
| Display / Hero / Logo | **Cinzel** or **Cormorant Garamond** |
| Headings (H1–H3) | **Cormorant Garamond** |
| Body / Long-form | **Source Serif 4** or **Merriweather** |
| Metadata / Utility (optional) | **JetBrains Mono** (sparingly) |

**Typography Rules:**

- Body text must be highly readable (min 16px, line-height 1.6–1.75)
- Headings must feel formal and scholarly
- Hero typography must feel premium and restrained
- Line length: 60–75 characters for body, 35–60 on mobile
- Hierarchy must be obvious; never use too many font styles
- Left-aligned by default; centered only when intentional

### 4.3 Color Palette — Slate & Lapis (Scholarly Press)

Inspiration: Cambridge University Press · Research journal covers · Museum catalogues · Architecture of serious knowledge institutions.

```css
:root {
  /* ── Backgrounds ─────────────────────────────────── */
  --color-bg-primary:      #F6F7F9;   /* cool off-white, clean reading surface */
  --color-bg-secondary:    #ECEEF2;   /* light slate wash */
  --color-bg-surface:      #E3E6ED;   /* muted blue-grey card surface */

  /* ── Text ───────────────────────────────────────── */
  --color-text-primary:    #14181F;   /* near-black with cool undertone */
  --color-text-secondary:  #3A4150;   /* slate ink — readable mid-tone */
  --color-text-muted:      #6B7587;   /* cool grey — for metadata, captions */

  /* ── Accent — Deep Teal ──────────────────────────── */
  --color-accent:          #1B6B7B;   /* Cambridge teal — primary action */
  --color-accent-hover:    #145968;   /* deeper teal on hover */
  --color-accent-subtle:   #D0E8EC;   /* pale teal tint for tags/chips */
  --color-accent-border:   #A8C8D0;   /* teal-tinted border */

  /* ── Supporting Palette ─────────────────────────── */
  --color-lapis:           #2B4A7A;   /* lapis blue — section accents */
  --color-lapis-subtle:    #D3DCF0;   /* pale lapis for highlight bg */
  --color-stone:           #8892A4;   /* neutral blue-grey for dividers */

  /* ── Semantic ───────────────────────────────────── */
  --color-success:         #1F6B4A;   /* forest success */
  --color-error:           #8B2A2A;   /* deep red error */

  /* ── Dark Mode ──────────────────────────────────── */
  --color-bg-dark:         #0C0F14;   /* deep slate-black */
  --color-bg-dark-surface: #141820;   /* rich dark-navy card surface */
  --color-bg-dark-raised:  #1C2230;   /* elevated dark surface */
  --color-text-dark:       #E4E8F0;   /* cool white for dark mode reading */
  --color-text-dark-muted: #7A8599;   /* muted cool grey for metadata */
  --color-accent-dark:     #4DB8CC;   /* bright teal on dark bg */
  --color-lapis-dark:      #7A9FD8;   /* lighter lapis for dark mode links */
}
```

**Palette Logic:**

| Token | Light Value | Dark Value | Purpose |
|-------|------------|------------|---------|
| `--color-bg-primary` | `#F6F7F9` | `#0C0F14` | Page background |
| `--color-accent` | `#1B6B7B` | `#4DB8CC` | CTAs, links, active states |
| `--color-lapis` | `#2B4A7A` | `#7A9FD8` | Section markers, nav indicators |
| `--color-text-primary` | `#14181F` | `#E4E8F0` | All body copy |
| `--color-stone` | `#8892A4` | `#4A5568` | Borders, dividers, separators |

Use color sparingly. Premium feeling must come from **restraint, not loudness.** Teal is used only for interactive elements and key credibility markers — never as decoration.

### 4.4 Layout Rhythm

```css
/* Container widths */
--container-xl:    1280px;
--container-lg:    1024px;
--container-md:     768px;
--container-text:   680px;   /* optimal reading width */

/* Section spacing */
--space-section-sm:   4rem;
--space-section-md:   7rem;
--space-section-lg:  10rem;
```

- Generous vertical spacing between sections
- Narrower reading widths for text-heavy content
- Editorial alignment with calm section rhythm
- Elegant, wide margins

### 4.5 Surface Styling

- **Cool off-white** (`#F6F7F9`) as the primary reading canvas — neutral, clean, professional
- **Slate-washed** card surfaces (`#E3E6ED`) for archives, paper listings, video grids
- **Teal-tinted borders** (`#A8C8D0`) as the only accent on cards — never loud
- Restrained box-shadows using cool-toned greys (`rgba(20,24,31,0.06)`) — no warm or coloured glows
- **Lapis blue** (`#2B4A7A`) used only for section-level markers, active nav indicators, and key labels
- Subtle cool gradients from `#F6F7F9` → `#ECEEF2` for section transitions
- Dark mode uses deep slate-navy (`#0C0F14`) — NOT pure black; feels rich and intentional
- Micro-borders and quiet dividers using `--color-stone` (`#8892A4` at 30–40% opacity)
- Premium hover: slight background shift to `--color-accent-subtle` + teal underline or border-left

### 4.6 Animation Direction (motion)

All animations must feel **refined and editorial — not flashy:**

| Type | Spec |
|------|------|
| Duration | 150–300ms micro, ≤400ms complex |
| Easing | ease-out entering, ease-in exiting |
| Entrance | Fade + subtle translateY (12–16px) |
| Hover | Gentle lift, subtle border brightening |
| Page transitions | Lightweight fade |
| Tabs/Filters | Smooth slide transitions |
| Reduced motion | Always respect `prefers-reduced-motion` |

### 4.7 Global CSS Implementation Checklist

The `global.css` must include:

- [ ] CSS variables in `:root` (all design tokens)
- [ ] Typography tokens and font imports
- [ ] Container width system
- [ ] Section spacing utilities
- [ ] Elegant heading styles (H1–H6)
- [ ] Body text defaults
- [ ] Premium nav styling
- [ ] Premium button variants (primary, ghost, outline)
- [ ] Premium form control styling
- [ ] Section divider styles
- [ ] Card / archive block styling
- [ ] Hero layout styling
- [ ] Footer styling
- [ ] Responsive breakpoints (375 / 768 / 1024 / 1440)
- [ ] Hover and focus states
- [ ] Light manuscript-inspired theme
- [ ] Optional dark theme (elegant, not neon)

---

## ❯ PART V — SITE STRUCTURE

### 5.1 Navigation

```
Home  ·  Research  ·  Publications  ·  Podcast  ·  Videos  ·  Speaking  ·  Books  ·  Media  ·  Contact
```

Navigation must feel like an academic or author publication platform — not a startup product nav.

### 5.2 Route Architecture

| Route | Page |
|-------|------|
| `/[locale]/` | Homepage |
| `/[locale]/research` | Research Overview |
| `/[locale]/publications` | Publications Archive |
| `/[locale]/podcast` | Podcast Library |
| `/[locale]/videos` | Video Archive |
| `/[locale]/speaking` | Speaking Profile |
| `/[locale]/books` | Books |
| `/[locale]/media` | Media & Press |
| `/[locale]/contact` | Contact |
| `/[locale]/search` | Dedicated Search Page |

---

## ❯ PART VI — HOMEPAGE STRUCTURE

Build the homepage in this **exact order:**

```
1. Hero Section
2. Research Focus Cards
3. Research Metrics Bar
4. Featured Research
5. Latest Videos
6. Published Papers
7. Books
8. Field Research
9. Speaking & Media
10. Contact
```

### Section 1 — Hero

**Required elements:**
- Name: **Varun Gupta**
- Title: **Mahabharata Researcher · Author · Speaker**
- Headline: *Mahabharata Researcher, Author & Speaker*
- Supporting line: *Separating text, tradition, and history through evidence-based Mahabharata research.*
- CTA Primary: **Watch Research Videos** → `/videos`
- CTA Secondary: **Read Research Papers** → `/publications`
- Portrait or scholarly visual treatment
- Credibility strip: Author · Papers · Talks · Interviews · Field Visits

> The hero must be **text-led, elegant, and premium.** It should not look like a startup landing page.

### Section 2 — Research Focus Cards

Four research domain cards:

| Card | Description |
|------|-------------|
| **Karna Studies** | Evolution of Karna traditions across regional Mahabharatas |
| **Critical Edition Studies** | BORI Critical Edition analysis |
| **Sanskrit Sources** | Comparative textual research |
| **Mahabharata Evolution** | Jaya → Bharata → Mahabharata |

Each card: Title · One-sentence description · Metadata line · Learn more link.  
These should feel like **research domains, not SaaS feature cards.**

### Section 3 — Research Metrics Bar

Display key credibility stats:
- Published Papers · Downloads · Citations · PDF Access

### Section 4 — Featured Research

Highlight flagship research, latest paper, or standout long-form work. Include:
- Abstract preview · Publication venue · Citation count · PDF access

### Section 5 — Latest Videos

- Featured video embed
- Category filter tabs
- Archive preview grid
- Browse all CTA

**Suggested categories:** Karna · Krishna · Bhishma · Mahabharata Textual History · Sanskrit Plays · Epic Evolution · Research Methodology

Design as a **categorized media library** — archival, not algorithmic or entertainment-first.

### Section 6 — Published Papers

For each paper display:
- Title · Abstract snippet · Journal · Date · DOI
- Citation count · Download count · PDF button

This section must **immediately signal scholarly seriousness.**

### Section 7 — Books

Feature:
- **Between Lies and Legacy** (current book)
- Placeholder cards for future titles

Each entry: Cover image · Short description · Availability/preorder CTA · Endorsement area · Related talks

### Section 8 — Field Research

Documented fieldwork from:
- Kurukshetra · Kaul Village · Rathewshwar Teerth · other historical sites

Use **photo essays, captions, note excerpts, location tags, and timeline/context details.** This is one of the strongest differentiating sections.

### Section 9 — Speaking & Media

**Speaking topics:**
- Mahabharata Beyond Television
- Karna: Text vs Tradition
- Evolution of the Mahabharata
- Krishna in Regional Traditions
- Research Methodology in Epic Studies

**Media types:** Podcasts · Interviews · Newspapers · Magazines · Guest appearances

### Section 10 — Contact

- Contact form with inquiry categories
- Research inquiries · Speaking inquiries
- Professional email · Social links · Collaboration invitation

---

## ❯ PART VII — PAGE-SPECIFIC DIRECTION

### Research Page
Research overview: methodology, textual focus areas, critical edition work, Sanskrit source work, related papers and videos. Feel: serious research overview.

### Publications Page
Digital research archive feel:
- All papers · Filters by category/year · Search capability
- Abstract previews · Metadata blocks · DOI / journal info
- Citation counts · PDF access/download

### Videos Page
Lecture/media archive feel:
- Featured video · Categories/tabs
- Archive grid · Playlist support · Scalable browsing

### Podcast Page
Curated media appearances:
- Embedded episodes/playlists · Topic tags
- Episode summaries · Platform/source metadata

### Books Page
Books as serious intellectual work:
- Featured book · Synopsis · Endorsements placeholder
- Purchase links · Related talks/media

### Media Page
Public presence and external validation:
- Interviews · Podcasts · Articles · Press mentions · Appearance cards
- Use publication cards, timeline rows, or logo-backed editorial links

### Speaking Page
Scholar-speaker profile:
- Topics · Formats (virtual/in-person) · Availability
- Inquiry form · Audience type suitability

### Contact Page
Minimal, elegant, professional:
- Form · Inquiry categories · Email CTA · Social links

---

## ❯ PART VIII — CONTENT ARCHITECTURE

### 8.1 Static Content (JSON)

Each page has its own dedicated JSON file. All of these must come from JSON:
- Headings · Labels · Descriptions · CTA text · Section intro copy

### 8.2 Dynamic Content (MongoDB)

MongoDB powers:
- Papers · Media appearances · Speaking records
- Downloads · Citations · Future video metadata · Future book data

### 8.3 MongoDB Schemas

#### Papers Collection
```ts
{
  title: string,
  titleLocalized: { en: string, hi: string },
  abstract: string,
  abstractLocalized: { en: string, hi: string },
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

#### Media Collection
```ts
{
  type: 'podcast' | 'interview' | 'newspaper' | 'magazine',
  title: string,
  titleLocalized: { en: string, hi: string },
  source: string,
  sourceUrl: string,
  date: Date,
  description: string,
  thumbnailUrl: string,
  featured: boolean,
  createdAt: Date
}
```

#### Speaking Collection
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

## ❯ PART IX — COMPONENT SYSTEM

Create these reusable components:

| Component | Purpose |
|-----------|---------|
| `EditableText` | Wraps all visible copy for editability |
| `SectionHeader` | Eyebrow label + heading + subtext |
| `Hero` | Full hero block with CTAs |
| `ResearchFocusGrid` | Four research domain cards |
| `StatsBar` | Research metrics strip |
| `FeaturedResearch` | Featured paper/research highlight |
| `VideoLibrary` | Categorized video archive with filters |
| `PaperCard` | Individual paper with metadata |
| `PublicationArchive` | Full publications listing |
| `BookCard` | Book feature with cover and CTA |
| `FieldResearchGallery` | Photo essay / gallery entry |
| `MediaCard` | Media mention / interview row |
| `SpeakingTopics` | Speaking topic cards |
| `ContactForm` | Accessible contact form |
| `LocaleSwitcher` | EN/HI toggle |
| `ThemeToggle` | Light/dark mode switch |
| `QuoteBlock` | Testimonial or endorsement block |

> **All rendered text must pass through `EditableText`.** No hardcoded user-facing copy in page components.

---

## ❯ PART X — UX & UI PRINCIPLES

### 10.1 UX Principles

- Prioritize **clarity over decoration**
- Make research outputs easy to scan using metadata, filters, and strong visual hierarchy
- Use **editorial reading rhythm** — vary between dense and open sections
- Keep most text **left-aligned** for readability and seriousness
- Use asymmetry **sparingly and intentionally**
- Treat publications and fieldwork areas as **trust-building proof sections**
- Ensure clear CTAs **without looking commercial**
- Design equally for scholars, curious readers, and media professionals

### 10.2 UI Principles

- Use editorial grids and archive-inspired cards
- Wide margins and comfortable reading widths
- Subtle borders and quiet surfaces — no loud drop shadows
- Strong desktop layouts AND equally polished mobile layouts
- **Avoid:** generic three-column SaaS feature grids, centered-everything layouts, decorative icon circles

### 10.3 Information Architecture (Navigation Groups)

```
Home → Research → Papers → Videos → Podcast → Books → Media → Speaking → Contact
```

Alternative compact navigation can merge sections, but the homepage must expose all major credibility signals early.

---

## ❯ PART XI — SEO & PERFORMANCE

### 11.1 SEO Requirements

Implement:
- `generateMetadata()` with per-page metadata
- Open Graph + Twitter Cards
- Canonical URLs
- Person schema
- Book schema
- ScholarlyArticle schema
- Media metadata (podcasts, interviews)
- Sitemap-ready structure

### 11.2 Performance Requirements

Optimize for:
- Minimal client-side JS (Server Components by default)
- Optimized images (WebP/AVIF, `next/image`)
- Lazy-loaded YouTube embeds
- Semantic HTML with accessible forms
- Scalable archive rendering
- Skeleton/shimmer loading states for async content
- Support future pagination and filters

---

## ❯ PART XII — FINAL OUTPUT REQUIREMENTS

The agent must deliver a **complete, production-ready implementation** that includes:

| # | Deliverable |
|---|------------|
| 1 | Full folder structure |
| 2 | Route architecture with locale support |
| 3 | Per-page JSON strategy + sample JSON for every page |
| 4 | All reusable components listed in Part IX |
| 5 | MongoDB models (Papers, Media, Speaking) |
| 6 | Homepage implementation (all 10 sections) |
| 7 | Shared layout and navigation |
| 8 | SEO setup (`generateMetadata`, schemas) |
| 9 | Locale setup (`/en`, `/hi`) |
| 10 | Dynamic content integration examples |
| 11 | **A premium handcrafted `global.css`** |
| 12 | Responsive behavior across all breakpoints |
| 13 | File-by-file output |
| 14 | Sitemap + homepage wireframe structure |
| 15 | Design system proposal |
| 16 | Copy blocks for each homepage section |

---

## ❯ PART XIII — QUALITY BAR

### Final Impression Check

**A visitor must immediately think:**

```
✓ Serious researcher
✓ Credible author
✓ Well-organized archive
✓ Evidence-based scholarship
✓ Premium but restrained design
```

**A visitor must NEVER think:**

```
✗ Generic mythology content creator
✗ Spiritual influencer
✗ News aggregator
✗ Templated portfolio site
✗ Startup marketing page
```

### Implementation Quality Rules

- [ ] Server Components by default; Client Components only when necessary
- [ ] All JSON page configs are strongly typed
- [ ] Schema-safe JSON loader utility with fallbacks
- [ ] Footer looks like a premium publication platform
- [ ] Editorial section composition — no repetitive feature grids
- [ ] Loading, empty, and error states for all async content
- [ ] Layouts are elegant and left-aligned by default
- [ ] Readable line lengths with generous spacing throughout
- [ ] No `.data.ts` files
- [ ] No hardcoded user-facing copy in components
- [ ] Does not look like a generic portfolio, SaaS template, or mythology blog

---

> *The final result must feel like a premium scholarly research and publishing platform — a serious long-term intellectual home for Varun Gupta's body of work.*
