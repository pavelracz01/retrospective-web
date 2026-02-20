# Retrospective Website - Design Document

**Project:** Marketing website for Retrospective consulting company
**Date:** 2026-02-20
**Approach:** Modern Stack + Optimizations (Approach 3)
**Timeline:** 5-7 days

---

## Overview

Marketing website for Retrospective - Slovak consulting company specializing in QA services and software development, with plans for own products. Website inspired by Testar Consulting but with red color scheme and enhanced with modern Next.js features.

### Key Requirements

- **Languages:** Slovak + Czech + English (3-locale support)
- **Services:** QA Consulting & Testing services presentation
- **Products:** Showcase for products in development (coming soon)
- **Content:** Blog + Case Studies (MDX-based)
- **Design:** Dark tech style with red color scheme (vs. Testar's blue)
- **Deployment:** Own VPS with Docker + Nginx + GitHub Actions
- **Branding:** Company name "Retrospective", basic contact info, logo TBD

---

## 1. Architecture & Tech Stack

### Core Framework
- **Next.js 15** (App Router) with maximum React Server Components usage
- **TypeScript 5+** for type safety
- **React 19** with Server Actions

### Styling & UI
- **Tailwind CSS v4** (alpha) - latest version with native CSS engine
- **shadcn/ui** components built on Radix UI
- **Framer Motion** for advanced animations and transitions
- **Lucide React** for icons

### Internationalization
- **next-intl v4** with support for SK + CS + EN
- Server-side translations for optimal performance
- Dedicated locale routes: `/sk`, `/cs`, `/en`

### Content Management
- **MDX** for blog and case studies
- **Gray Matter** for frontmatter parsing
- **@tailwindcss/typography** for rich content styling
- Statically generated pages (ISR) for fast loading

### Optimizations
- **Server Components by default** - minimal client-side JavaScript
- **Image Optimization** with Next.js Image + AVIF/WebP
- **Font Optimization** with `next/font` (local fonts, zero layout shift)
- **Partial Prerendering** (experimental) for hybrid static/dynamic pages
- **Streaming** for progressive content loading

### Form Handling
- **React Server Actions** for contact form (no client-side JS needed)
- **Resend** API for email notifications
- **Zod** for server and client validation

### Deployment
- **Docker** multi-stage build for production
- **Nginx** as reverse proxy
- **GitHub Actions** CI/CD pipeline
- Deployment to own VPS with automatic pull/restart

---

## 2. Project Structure & Components

### Directory Structure

```
retrospective-web/
├── app/
│   ├── [locale]/              # Locale routing (sk, cs, en)
│   │   ├── layout.tsx         # Root layout with navbar/footer
│   │   ├── page.tsx           # Homepage
│   │   ├── blog/
│   │   │   ├── page.tsx       # Blog listing
│   │   │   └── [slug]/page.tsx
│   │   ├── case-studies/
│   │   │   ├── page.tsx       # Case studies listing
│   │   │   └── [slug]/page.tsx
│   │   ├── products/
│   │   │   └── page.tsx       # Products (coming soon)
│   │   └── api/
│   │       └── contact/route.ts  # Server Action endpoint
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx         # Server Component with locale switcher
│   │   └── Footer.tsx
│   ├── sections/              # Homepage sections
│   │   ├── Hero.tsx           # Client Component (animations)
│   │   ├── Services.tsx       # Server Component
│   │   ├── WhyRetrospective.tsx
│   │   ├── Process.tsx
│   │   ├── Products.tsx       # Coming soon preview
│   │   ├── References.tsx
│   │   ├── BlogPreview.tsx
│   │   └── Contact.tsx        # Client Component (form)
│   └── ui/                    # shadcn components
│       ├── button.tsx
│       ├── card.tsx
│       ├── separator.tsx
│       └── ...
├── content/
│   ├── blog/
│   │   ├── sk/
│   │   ├── cs/
│   │   └── en/
│   └── case-studies/
│       ├── sk/
│       ├── cs/
│       └── en/
├── messages/                  # i18n translations
│   ├── sk.json
│   ├── cs.json
│   └── en.json
├── lib/
│   ├── mdx.ts                # MDX utilities
│   ├── utils.ts              # Helpers (cn, clsx)
│   └── actions.ts            # Server Actions
├── public/
│   ├── images/
│   └── fonts/
├── i18n/
│   └── config.ts             # next-intl config
└── docker/
    ├── Dockerfile
    ├── docker-compose.yml
    └── nginx.conf
```

### Key Components

**Homepage Sections (in order):**

1. **Hero** - Fullscreen with typewriter effect, red gradients, CTA
2. **Services** - Grid of 4 services (Manual QA, Automation, Consulting, Performance)
3. **Products** - Preview of products in development with "Coming Soon" badges
4. **WhyRetrospective** - Statistics + bullet points
5. **Process** - Workflow diagram (4 steps)
6. **References/Case Studies** - Carousel of successful projects
7. **BlogPreview** - 3 latest articles
8. **Contact** - Form with Server Action

**Component Strategy:**
- **Server Components** for static content (Services, Why Us, etc.)
- **Client Components** only where needed: Hero (animations), Contact (form), BlogPreview (carousel)
- **Partial Hydration** - minimize JS bundle

---

## 3. Visual Design & Styling

### Color Palette (Red Tech Scheme)

**Primary Colors:**
- **Red:** `#DC2626` (red-600) - main brand color
- **Dark Red:** `#991B1B` (red-800) - hover states, dark accents
- **Light Red:** `#EF4444` (red-500) - highlights, glow effects
- **Orange:** `#F97316` (orange-500) - complementary gradient

**Background & Neutrals:**
- **Dark Background:** `#0A0F1E` (dark blue, kept from Testar)
- **Card Background:** `#1E293B` (slate-800)
- **Text Primary:** `#F1F5F9` (slate-100)
- **Text Secondary:** `#94A3B8` (slate-400)

**Gradients:**
```css
/* Primary gradient */
bg-gradient-to-r from-red-600 to-orange-500

/* Glow effects */
bg-red-600/20 blur-3xl

/* Text gradient */
bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent
```

### Design Elements

**Hero Section:**
- Fullscreen dark background with SVG grid pattern
- Two glow orbs (red + orange) with blur effect
- Typewriter effect with red cursor
- Gradient text headline
- Floating badge with pulsing indicator
- Wave divider at bottom (SVG)
- Scroll hint animation

**Sections:**
- Alternating dark background (`#0A0F1E`) and lighter (`#F1F5F9` slate-50)
- Cards with `backdrop-blur` effect
- Hover states with red glow
- Subtle border gradients on cards
- Animated separators between sections

**Typography:**
- **Headings:** System font stack (SF Pro / Segoe UI) via `next/font`
- **Body:** Inter font for readability
- **Code blocks:** JetBrains Mono (for blog if needed)

**Animations (Framer Motion):**
- Fade-in-up on sections (on scroll)
- Stagger animations on cards/grid items
- Hover scale effects (1.02-1.05)
- Typewriter effect in Hero
- Smooth page transitions
- Parallax scroll effects (subtle)

**Responsivity:**
- Mobile-first approach
- Breakpoints: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`
- Hamburger menu on mobile with slide-in drawer
- Optimized touch targets (min 44px)

---

## 4. Content Management & Data Flow

### Blog & Case Studies (MDX)

**Frontmatter Schema:**

```typescript
// Blog post
interface BlogPost {
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  author: string;
  tags: string[];
  image?: string; // Optional hero image
  published: boolean;
}

// Case Study
interface CaseStudy {
  title: string;
  client: string;
  industry: string;
  description: string;
  date: string;
  tags: string[];
  results: string[]; // Key metrics/outcomes
  image?: string;
  published: boolean;
}
```

**File Structure:**
```
content/
├── blog/
│   ├── sk/
│   │   ├── 2026-01-15-automatizacia-qa.mdx
│   │   └── 2026-02-01-testovanie-api.mdx
│   ├── cs/
│   │   └── 2026-01-15-automatizace-qa.mdx
│   └── en/
│       └── 2026-01-15-qa-automation.mdx
└── case-studies/
    ├── sk/
    │   └── projekt-banking-app.mdx
    ├── cs/
    └── en/
```

**Content Loading:**
- Server-side parsing (zero client JS)
- Static generation with ISR (revalidate every 3600s)
- Sorting by date (desc)
- Filtering by `published: true`
- Tag-based filtering/search

### Translations (next-intl)

**Namespace structure in messages/*.json:**
```json
{
  "nav": { "services": "...", "blog": "...", ... },
  "hero": { "headline": "...", "cta": "...", ... },
  "services": { "title": "...", "items": [...] },
  "products": { "title": "...", "comingSoon": "..." },
  "why": { "stats": [...], "points": [...] },
  "process": { "steps": [...] },
  "contact": { "form": {...}, "success": "..." },
  "footer": { "copyright": "...", "links": [...] }
}
```

**Locale Detection & Routing:**
- Default locale: `sk`
- URL pattern: `/sk/blog`, `/cs/blog`, `/en/blog`
- Locale switcher in Navbar (flags + labels)
- Automatic redirect if locale prefix missing
- SEO: `hreflang` tags for all languages

### Products Section (Coming Soon)

**Data source:**
- Hardcoded in `messages/*.json` initially
- Array of products with:
  ```json
  {
    "products": [
      {
        "name": "Product Name",
        "description": "Short description",
        "status": "In Development",
        "eta": "Q2 2026",
        "icon": "rocket" // Lucide icon name
      }
    ]
  }
  ```
- Possible to move to MDX/CMS later

### Services Content

**Hardcoded services in translations:**
- Manual QA Testing
- Test Automation
- QA Consulting & Strategy
- Performance & Load Testing

Each service contains: icon, title, description, optional link

---

## 5. Deployment & CI/CD

### Docker Setup

**Multi-stage Dockerfile:**
```dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  retrospective-web:
    build: .
    container_name: retrospective-prod
    restart: unless-stopped
    ports:
      - "3001:3000"
    environment:
      - NODE_ENV=production
      - RESEND_API_KEY=${RESEND_API_KEY}
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.retrospective.rule=Host(`retrospective.sk`)"
      - "traefik.http.routers.retrospective.tls.certresolver=letsencrypt"
```

### Nginx Configuration

**nginx.conf:**
- Reverse proxy to port 3001
- Gzip compression
- Static asset caching (1 year)
- Security headers
- Rate limiting
- HTTP/2 support

### GitHub Actions Pipeline

**Workflow (.github/workflows/deploy.yml):**

**Trigger:** Push to `main` branch

**Steps:**
1. **Checkout code**
2. **Run tests** (lint, type-check, build test)
3. **Build Docker image** on VPS
4. **Deploy:**
   - SSH to VPS
   - Pull latest code
   - Docker compose down
   - Docker compose build --no-cache
   - Docker compose up -d
   - Health check (curl localhost:3001)
5. **Notify** (optional Slack/Discord webhook)

**GitHub Secrets needed:**
- `VPS_HOST` - Server IP address
- `VPS_USER` - SSH user (e.g. `claude`)
- `VPS_SSH_KEY` - Private SSH key
- `RESEND_API_KEY` - For email form

### VPS Requirements

**First-time setup:**
1. Create `/opt/apps/retrospective-prod` directory
2. Install Docker + Docker Compose
3. Configure Traefik (if not already running)
4. Set DNS A record: `retrospective.sk` → VPS IP
5. Add GitHub deploy key to repo

**System requirements:**
- Ubuntu 22.04+ / Debian 11+
- Docker 24+
- 2GB RAM minimum (recommend 4GB)
- 20GB disk space

### SSL & Domain

- **Traefik** with Let's Encrypt for automatic SSL certificates
- Automatic renewal
- Redirect HTTP → HTTPS
- HSTS headers

### Monitoring (Optional)

- Docker healthchecks
- Uptime monitoring (UptimeRobot / Betteruptime)
- Error tracking (Sentry - optional)
- Analytics (Plausible / Google Analytics - optional)

---

## 6. Error Handling, Testing & Performance

### Error Handling

**Next.js Error Boundaries:**
- `app/error.tsx` - Global error boundary
- `app/[locale]/error.tsx` - Locale-specific errors
- `app/not-found.tsx` - Custom 404 page
- Per-route error handling for blog/case studies

**Server Actions Error Handling:**
```typescript
// lib/actions.ts
try {
  await resend.emails.send({...});
  return { success: true };
} catch (error) {
  console.error('Email send failed:', error);
  return {
    success: false,
    error: 'Failed to send message'
  };
}
```

**Client-side:**
- Toast notifications for form errors (shadcn/ui toast)
- Graceful degradation (form works without JS)
- Loading states for async operations

### Validation

**Form Validation (Zod):**
```typescript
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10).max(1000),
});
```

- Server validation (Server Action)
- Optional client-side validation (for better UX)
- Localized error messages via next-intl

### Testing Strategy

**Pre-launch minimum:**
- **ESLint** + **TypeScript** type checking
- **Build test** (no build errors)
- **Manual testing** of all pages and form

**Optional (future):**
- Unit tests (Vitest) for utility functions
- E2E tests (Playwright) for critical flows
- Visual regression testing (Percy/Chromatic)

### Performance Optimizations

**Images:**
- Next.js `<Image>` component with automatic optimization
- AVIF/WebP formats with fallback
- Lazy loading (native)
- Blur placeholder for hero images
- Responsive images (`sizes` attribute)

**Fonts:**
- Local fonts via `next/font`
- Font subsetting (only needed glyphs)
- `font-display: swap` for FOUT prevention
- Preload critical fonts

**JavaScript:**
- Server Components by default (minimal JS)
- Dynamic imports for heavy components
- Route-based code splitting (automatic)
- Remove unused dependencies

**CSS:**
- Tailwind CSS purge (production)
- Critical CSS inline
- Minimal custom CSS

**Caching:**
- Static generation for blog/case studies
- ISR (Incremental Static Regeneration) - revalidate 1 hour
- CDN-ready (Cloudflare optional)
- Browser caching headers via Nginx

**Core Web Vitals Targets:**
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **FCP** (First Contentful Paint): < 1.8s

### Security

**Headers (Nginx):**
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`
- CSP (Content Security Policy) - basic

**Rate Limiting:**
- Contact form: max 5 submissions / 15min per IP
- Nginx rate limiting for API routes

**Dependencies:**
- Regular `npm audit` checks
- Dependabot alerts enabled
- Lock file committed

### Accessibility

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus visible states
- Alt texts on images
- Color contrast ratio WCAG AA compliant

---

## Summary

This design creates a modern, performant marketing website for Retrospective using cutting-edge Next.js 15 features with Server Components, optimized images and fonts, and a striking red tech aesthetic. The three-language support (SK/CS/EN) positions the company for regional expansion, while the MDX-based blog and case studies provide content marketing capabilities. Products section allows showcasing upcoming offerings. VPS deployment with Docker ensures full control and predictable costs.

**Estimated Timeline:** 5-7 days
**Next Step:** Create detailed implementation plan
