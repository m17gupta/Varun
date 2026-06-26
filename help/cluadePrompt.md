# Single-Tenant SaaS Knowledge Platform — Next.js 15 + TypeScript + MongoDB + Shadcn + Framer Motion

> **Inspired by:** Ryan Holiday · Niall Ferguson · Jordan B. Peterson
> **Stack:** Next.js 15 App Router · TypeScript (strict) · MongoDB + Mongoose · Shadcn/ui · Framer Motion
> **Model:** Single-Tenant · One Creator · One Deployed Instance

---

## ROLE

Act as an **Elite Full-Stack Next.js 15 Architect**, **SaaS Product Designer**, **Design System Specialist**, and **Senior TypeScript Engineer**.

Build a complete, production-ready **single-tenant personal knowledge platform** — a premium site for one creator (author, academic, educator, coach, or historian) that combines:

- a **personal brand presence** with editorial authority,
- a **research & publications hub**,
- a **video learning center**,
- a **podcast platform**,
- a **membership & gating system**,
- and an **AI-powered semantic search layer**.

The platform must feel like a serious long-term intellectual publishing product — not a blog theme, generic portfolio, startup landing page, or mythology site.

---

## TECH STACK (MANDATORY — DO NOT DEVIATE)

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router, Server Components by default) |
| **Language** | TypeScript (strict mode, `"strict": true`) |
| **Database** | MongoDB via Mongoose (ODM) |
| **UI Components** | Shadcn/ui (Radix UI primitives + Tailwind) |
| **Animation** | Framer Motion (page transitions, scroll reveals, micro-interactions) |
| **Styling** | Tailwind CSS + custom `globals.css` design tokens |
| **Auth** | NextAuth.js v5 (Auth.js) with role-based access |
| **Payments** | Stripe (subscriptions + one-time payments) |
| **Email** | Resend (transactional + newsletter broadcasts) |
| **File Storage** | Cloudflare R2 or AWS S3 (PDFs, video thumbnails, images) |
| **Video** | Mux or Cloudflare Stream (hosted video + embed support) |
| **AI Search** | OpenAI Embeddings + MongoDB Atlas Vector Search (RAG) |
| **Analytics** | Posthog (product analytics) + Plausible (site traffic) |

---

## ARCHITECTURE RULES (MANDATORY)

1. **NO `.data.ts` files anywhere** — all static content in per-page JSON configs
2. **Each page has its own dedicated JSON config** at `src/config/pages/[page].json`
3. **All visible text wrapped in an `EditableText` component**
4. **Server Components by default** — use `"use client"` only when required
5. **MongoDB models** in `src/models/` as Mongoose schemas with strict TypeScript types
6. **Framer Motion** used for: page transitions, section reveals, hero animations, card hovers, nav state
7. **Shadcn components** as the base UI primitives — extend, never replace
8. **Role-based access**: `admin` · `paid_member` · `free_member` · `visitor`
9. **All API routes** in `src/app/api/` using Next.js Route Handlers
10. **Environment variables** typed via `src/env.ts` using zod validation
11. Must be **fully responsive** (mobile-first)
12. Must be **SEO optimized** with `generateMetadata()` per page
13. Must support **Open Graph + Twitter cards**
14. Must support **JSON-LD structured data** (Person, Book, ScholarlyArticle, Course schemas)

---

## DESIGN SYSTEM GOAL

### Visual Character
The platform must feel like a blend of:
- Premium editorial publication
- Academic research archive
- Modern educator platform
- Elegant author website

### Typography (via Google Fonts + Tailwind config)
- **Display / Hero:** Cormorant Garamond or Playfair Display
- **Headings:** Cormorant Garamond
- **Body:** Source Serif 4 or Merriweather
- **UI / Utility:** Inter (Shadcn default — keep for form controls)

### Palette Tokens (in `globals.css` `:root`)
```css
:root {
  --background: 40 20% 97%;           /* parchment white */
  --foreground: 25 40% 12%;           /* deep ink */
  --card: 38 25% 94%;
  --card-foreground: 25 40% 12%;
  --primary: 30 50% 25%;              /* rich espresso */
  --primary-foreground: 38 30% 94%;
  --secondary: 35 20% 88%;
  --secondary-foreground: 25 35% 18%;
  --muted: 35 15% 90%;
  --muted-foreground: 28 20% 45%;
  --accent: 35 45% 40%;               /* warm amber-gold */
  --accent-foreground: 38 30% 96%;
  --border: 33 20% 82%;
  --ring: 35 45% 40%;
  --radius: 0.5rem;
}
```

### Framer Motion Patterns (reuse across the codebase)
```ts
// Shared animation variants — src/lib/motion.ts
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};
export const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
};
```

---

## FOLDER STRUCTURE

```
src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                        ← Homepage
│   │   ├── about/page.tsx
│   │   ├── books/page.tsx
│   │   ├── articles/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── research/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── videos/page.tsx
│   │   ├── courses/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       ├── page.tsx
│   │   │       └── learn/page.tsx          ← members only
│   │   ├── podcast/page.tsx
│   │   ├── newsletter/page.tsx
│   │   ├── media/page.tsx
│   │   ├── speaking/page.tsx
│   │   ├── membership/page.tsx
│   │   ├── search/page.tsx
│   │   └── contact/page.tsx
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/
│   │   └── admin/
│   │       ├── page.tsx                    ← Admin overview
│   │       ├── content/page.tsx
│   │       ├── members/page.tsx
│   │       ├── newsletter/page.tsx
│   │       └── analytics/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── articles/route.ts
│   │   ├── research/route.ts
│   │   ├── videos/route.ts
│   │   ├── courses/route.ts
│   │   ├── newsletter/route.ts
│   │   ├── membership/route.ts
│   │   ├── search/route.ts                 ← AI semantic search
│   │   ├── stripe/webhook/route.ts
│   │   └── upload/route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                                 ← Shadcn primitives (auto-generated)
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   ├── shared/
│   │   ├── EditableText.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── AnimatedSection.tsx             ← Framer Motion scroll reveal wrapper
│   │   ├── PageTransition.tsx              ← Framer Motion page wrapper
│   │   └── MemberGate.tsx                  ← Role-based content gate
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── ResearchFocusGrid.tsx
│   │   ├── StatsBar.tsx
│   │   ├── FeaturedContent.tsx
│   │   ├── VideoPreview.tsx
│   │   └── NewsletterSignup.tsx
│   ├── content/
│   │   ├── ArticleCard.tsx
│   │   ├── ResearchCard.tsx
│   │   ├── VideoCard.tsx
│   │   ├── PodcastCard.tsx
│   │   ├── BookCard.tsx
│   │   ├── CourseCard.tsx
│   │   └── MediaCard.tsx
│   └── membership/
│       ├── PricingTable.tsx
│       └── MembershipBadge.tsx
├── models/                                 ← Mongoose schemas
│   ├── Article.ts
│   ├── Research.ts
│   ├── Video.ts
│   ├── Course.ts
│   ├── Podcast.ts
│   ├── Book.ts
│   ├── Media.ts
│   ├── Member.ts
│   ├── Newsletter.ts
│   └── Speaking.ts
├── lib/
│   ├── mongodb.ts                          ← DB connection singleton
│   ├── motion.ts                           ← Framer Motion variants
│   ├── auth.ts                             ← NextAuth config
│   ├── stripe.ts                           ← Stripe client
│   ├── resend.ts                           ← Email client
│   ├── ai-search.ts                        ← OpenAI + vector search
│   └── utils.ts
├── config/
│   └── pages/
│       ├── home.json
│       ├── about.json
│       ├── books.json
│       ├── articles.json
│       ├── research.json
│       ├── videos.json
│       ├── courses.json
│       ├── podcast.json
│       ├── newsletter.json
│       ├── membership.json
│       ├── media.json
│       ├── speaking.json
│       └── contact.json
├── types/
│   ├── content.ts
│   ├── member.ts
│   └── api.ts
└── env.ts                                  ← Zod-validated env vars
```

---

## MONGODB SCHEMAS (Mongoose + TypeScript)

### Article
```ts
const ArticleSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },         // MDX or HTML
  excerpt: { type: String },
  coverImage: { type: String },
  category: { type: String },
  tags: [String],
  readingTime: { type: Number },
  accessTier: { type: String, enum: ['public', 'free_member', 'paid'], default: 'public' },
  embedding: [Number],                                // OpenAI vector
  publishedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
```

### Research / Publication
```ts
const ResearchSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  abstract: { type: String },
  pdfUrl: { type: String },
  journal: { type: String },
  doi: { type: String },
  category: { type: String },
  tags: [String],
  downloadCount: { type: Number, default: 0 },
  citationCount: { type: Number, default: 0 },
  accessTier: { type: String, enum: ['public', 'free_member', 'paid'], default: 'public' },
  embedding: [Number],
  publishedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});
```

### Video
```ts
const VideoSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  muxPlaybackId: { type: String },                    // Mux asset
  youtubeId: { type: String },                        // fallback embed
  thumbnailUrl: { type: String },
  duration: { type: Number },                         // seconds
  category: { type: String },
  tags: [String],
  chapters: [{ title: String, timestamp: Number }],
  transcript: { type: String },
  accessTier: { type: String, enum: ['public', 'free_member', 'paid'], default: 'public' },
  embedding: [Number],
  viewCount: { type: Number, default: 0 },
  publishedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});
```

### Course
```ts
const CourseSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  coverImage: { type: String },
  price: { type: Number },
  accessTier: { type: String, enum: ['free_member', 'paid', 'purchase'] },
  modules: [{
    title: String,
    order: Number,
    lessons: [{
      title: String,
      videoId: { type: Schema.Types.ObjectId, ref: 'Video' },
      duration: Number,
      isFree: { type: Boolean, default: false }
    }]
  }],
  enrollmentCount: { type: Number, default: 0 },
  publishedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});
```

### Member
```ts
const MemberSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'paid_member', 'free_member'], default: 'free_member' },
  stripeCustomerId: { type: String },
  stripeSubscriptionId: { type: String },
  subscriptionStatus: { type: String, enum: ['active', 'canceled', 'past_due', 'trialing'] },
  membershipTier: { type: String, enum: ['free', 'supporter', 'premium'], default: 'free' },
  emailVerified: { type: Boolean, default: false },
  newsletterSubscribed: { type: Boolean, default: true },
  courseProgress: [{
    courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
    completedLessons: [String],
    lastAccessedAt: Date
  }],
  createdAt: { type: Date, default: Date.now }
});
```

### Newsletter
```ts
const NewsletterSchema = new Schema({
  subject: { type: String, required: true },
  content: { type: String, required: true },
  recipientTier: { type: String, enum: ['all', 'free_member', 'paid'], default: 'all' },
  sentAt: { type: Date },
  openCount: { type: Number, default: 0 },
  clickCount: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'scheduled', 'sent'], default: 'draft' },
  createdAt: { type: Date, default: Date.now }
});
```

---

## HOMEPAGE STRUCTURE

### 1. Hero Section
- Creator name (display font, large)
- Role / tagline
- Primary headline
- Supporting sentence
- Two CTA buttons (primary + secondary)
- Framer Motion: text stagger reveal on load, subtle background parallax

### 2. Stats Bar
- Key metrics: papers published, video hours, newsletter subscribers, members
- Dark inverted strip (editorial anchor)
- Framer Motion: count-up animation on scroll into view

### 3. Content Focus Grid
- 4 research/topic domains as editorial cards
- Numbered (`01` → `04`) with title, description, tag
- Framer Motion: stagger fade-up on scroll

### 4. Featured Content
- Flagship paper or article (2/3 width)
- 3 recent items in sidebar (1/3 width)
- Framer Motion: slide-in from left/right

### 5. Latest Videos
- Category filter pills
- Featured video (large)
- 4-card grid
- Browse all CTA
- Framer Motion: filter transition with layout animation

### 6. Newsletter CTA
- Email capture with Resend integration
- Membership upsell hook

### 7. Books Showcase
- Featured book cover + description
- Purchase CTA

### 8. Speaking & Media
- Speaking topics list
- Recent media appearances

---

## PAGE CONFIGS (JSON-driven)

Every page must load its static content from a JSON config file.

### Example: `src/config/pages/home.json`
```json
{
  "hero": {
    "eyebrow": "Researcher · Author · Speaker",
    "name": "Varun Gupta",
    "headline": "Mahabharata Researcher, Author & Speaker",
    "tagline": "Separating text, tradition, and history through evidence-based research.",
    "ctaPrimary": { "label": "Watch Research Videos", "href": "/videos" },
    "ctaSecondary": { "label": "Read Research Papers", "href": "/research" }
  },
  "stats": [
    { "value": "14", "label": "Published Papers" },
    { "value": "8,200+", "label": "Downloads" },
    { "value": "340+", "label": "Citations" },
    { "value": "Free", "label": "PDF Access" }
  ],
  "researchFocus": {
    "sectionLabel": "Areas of Inquiry",
    "sectionTitle": "Research Focus",
    "items": [
      { "num": "01", "title": "Karna Studies", "desc": "Evolution of Karna traditions across regional Mahabharatas.", "tag": "12 Papers" },
      { "num": "02", "title": "Critical Edition Studies", "desc": "BORI Critical Edition analysis and manuscript apparatus.", "tag": "BORI · Sanskrit" },
      { "num": "03", "title": "Sanskrit Sources", "desc": "Comparative textual research across primary Sanskrit sources.", "tag": "Comparative · Textual" },
      { "num": "04", "title": "Mahabharata Evolution", "desc": "Tracing the growth from Jaya → Bharata → Mahabharata.", "tag": "Epic · Archaeology" }
    ]
  }
}
```

---

## KEY COMPONENTS SPEC

### `AnimatedSection.tsx` — Framer Motion scroll reveal wrapper
```tsx
"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### `MemberGate.tsx` — Role-based content access
```tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

type Tier = "free_member" | "paid";

export async function MemberGate({ tier, children }: { tier: Tier; children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (tier === "free_member" && !role) redirect("/login");
  if (tier === "paid" && role !== "paid_member" && role !== "admin") redirect("/membership");
  return <>{children}</>;
}
```

### `EditableText.tsx`
```tsx
export function EditableText({ value, as: Tag = "span", className }: {
  value: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}) {
  return <Tag className={className}>{value}</Tag>;
}
```

---

## AI SEARCH (RAG)

### Architecture
1. On content publish → generate OpenAI embedding → store in MongoDB `embedding` field
2. On search query → embed query → MongoDB Atlas Vector Search `$vectorSearch`
3. Top-K results → passed as context to OpenAI Chat Completion
4. Response streamed back via Next.js Route Handler

### Route: `src/app/api/search/route.ts`
```ts
import OpenAI from "openai";
import { connectDB } from "@/lib/mongodb";
import Article from "@/models/Article";
import Research from "@/models/Research";

const openai = new OpenAI();

export async function POST(req: Request) {
  const { query } = await req.json();
  await connectDB();

  const queryEmbedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query,
  });

  const vector = queryEmbedding.data[0].embedding;

  const results = await Article.aggregate([
    {
      $vectorSearch: {
        index: "article_vector_index",
        path: "embedding",
        queryVector: vector,
        numCandidates: 100,
        limit: 5,
      },
    },
    { $project: { title: 1, excerpt: 1, slug: 1, score: { $meta: "vectorSearchScore" } } },
  ]);

  const context = results.map(r => `${r.title}: ${r.excerpt}`).join("\n");

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [
      { role: "system", content: "You are a helpful assistant for a scholarly research platform. Answer based only on the provided context." },
      { role: "user", content: `Context:\n${context}\n\nQuestion: ${query}` },
    ],
  });

  return new Response(completion.toReadableStream());
}
```

---

## MEMBERSHIP & STRIPE

### Tiers
| Tier | Price | Access |
|---|---|---|
| Free | $0 | Public content only |
| Supporter | $9/mo | All articles, research PDFs, podcast |
| Premium | $29/mo | Everything + courses + community |

### Stripe Webhook Handler — `src/app/api/stripe/webhook/route.ts`
```ts
import Stripe from "stripe";
import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);

  await connectDB();

  if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.created") {
    const sub = event.data.object as Stripe.Subscription;
    await Member.findOneAndUpdate(
      { stripeCustomerId: sub.customer as string },
      {
        subscriptionStatus: sub.status,
        membershipTier: sub.metadata.tier,
        role: sub.status === "active" ? "paid_member" : "free_member",
        stripeSubscriptionId: sub.id,
      }
    );
  }

  return new Response("ok");
}
```

---

## SEO — Per Page

```ts
// Example: src/app/(public)/research/page.tsx
export async function generateMetadata(): Promise<Metadata> {
  const config = await import("@/config/pages/research.json");
  return {
    title: config.seo.title,
    description: config.seo.description,
    openGraph: {
      title: config.seo.title,
      description: config.seo.description,
      images: [{ url: config.seo.ogImage }],
    },
    twitter: { card: "summary_large_image" },
  };
}
```

### JSON-LD Schemas to implement
- `Person` — on homepage and about
- `Book` — on each book page
- `ScholarlyArticle` — on each research paper
- `Course` — on each course landing page
- `Event` — on speaking/events page
- `PodcastSeries` — on podcast page

---

## ADMIN DASHBOARD

Build at `/admin` (protected, `role === "admin"` only):

### Panels
| Panel | Features |
|---|---|
| **Overview** | Stats: members, revenue, content count, recent signups |
| **Content** | CRUD for articles, research, videos, courses, books |
| **Members** | Member list, role management, subscription status |
| **Newsletter** | Compose, schedule, send broadcasts via Resend |
| **Analytics** | Posthog embed + content performance table |

Use Shadcn `DataTable` (TanStack Table), `Sheet`, `Dialog`, `Form`, `Select`, `Badge` throughout the admin.

---

## ENV VARIABLES (typed via Zod in `src/env.ts`)

```env
# MongoDB
MONGODB_URI=

# NextAuth
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=

# OpenAI
OPENAI_API_KEY=

# Mux (video)
MUX_TOKEN_ID=
MUX_TOKEN_SECRET=

# Storage
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
```

---

## FRAMER MOTION USAGE MAP

| Location | Animation |
|---|---|
| Page entry | `PageTransition` wrapper — opacity + y fade |
| Hero text | Staggered word/line reveal |
| Stats bar | Count-up numbers on scroll into view |
| Section headers | Fade-up with slight delay |
| Research/content cards | Stagger fade-up grid reveal |
| Video filter switch | `layout` animation on active pill |
| Nav mobile menu | Slide-down + stagger links |
| Membership cards | Scale-in + hover lift |
| Modal / Sheet open | Framer `AnimatePresence` |
| Homepage stats counter | `useMotionValue` + `useTransform` |

---

## IMPLEMENTATION QUALITY RULES

- Use `React.cache()` for repeated DB calls in Server Components
- Use `next/image` everywhere — no raw `<img>` tags
- Lazy-load video embeds and heavy sections
- Add `loading.tsx` and `error.tsx` per route segment
- Add `not-found.tsx` globally
- Use Shadcn `Skeleton` for loading states
- Type all Mongoose documents with generics: `Model<IArticle>`
- Use Zod for all API request validation
- Keep `globals.css` as the single source of design tokens
- Use Tailwind only for layout/spacing utilities
- Prefer named exports for components, default exports for pages
- Add pagination to all archive pages (articles, research, videos)
- All forms built with `react-hook-form` + Zod + Shadcn `Form`

---

## OUTPUT REQUIREMENTS

Generate a complete production-ready implementation including:

1. Full folder structure
2. `globals.css` with complete design token system
3. `tailwind.config.ts` with custom font and color extensions
4. MongoDB connection singleton (`src/lib/mongodb.ts`)
5. All Mongoose models with TypeScript interfaces
6. NextAuth config with role-based session typing
7. Homepage implementation (all 7 sections)
8. Shared layout (Navbar + Footer)
9. `src/lib/motion.ts` with all animation variants
10. `AnimatedSection`, `PageTransition`, `MemberGate`, `EditableText` components
11. Sample JSON for every page config
12. SEO `generateMetadata()` on every page
13. JSON-LD structured data helpers
14. Admin dashboard scaffold
15. Stripe webhook + membership flow
16. AI search route handler
17. Fully responsive across mobile, tablet, desktop

Do not hardcode user-facing copy directly in components.
Do not use `.data.ts` files.
Do not build a generic portfolio, blog theme, or SaaS template.
The result must feel like a **premium scholarly knowledge platform** built for one serious creator.