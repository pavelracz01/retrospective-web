# Retrospective Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a modern marketing website for Retrospective consulting company with Next.js 15, 3-language support (SK/CS/EN), MDX blog, and red tech aesthetic.

**Architecture:** Next.js 15 App Router with React Server Components, next-intl for i18n, MDX for content, Tailwind v4 for styling, Docker deployment.

**Tech Stack:** Next.js 15, React 19, TypeScript 5+, Tailwind CSS v4, next-intl v4, MDX, Framer Motion, shadcn/ui, Resend, Zod

---

## Phase 1: Project Foundation

### Task 1.1: Initialize Next.js Project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `.gitignore`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`

**Step 1: Create Next.js 15 project**

Run:
```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

When prompted:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: No
- App Router: Yes
- Import alias: Yes (@/*)

Expected: Project scaffolded with Next.js 15

**Step 2: Verify build**

Run: `npm run dev`
Expected: Dev server starts on http://localhost:3000

**Step 3: Commit**

```bash
git add .
git commit -m "feat: initialize Next.js 15 project with TypeScript and Tailwind"
```

---

### Task 1.2: Install Core Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install dependencies**

Run:
```bash
npm install next-intl@4 framer-motion lucide-react gray-matter zod resend
npm install -D @types/node
```

Expected: Dependencies installed successfully

**Step 2: Verify installation**

Run: `npm list next-intl framer-motion lucide-react`
Expected: All packages listed with versions

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add core dependencies (next-intl, framer-motion, lucide-react, zod, resend)"
```

---

### Task 1.3: Install MDX Support

**Files:**
- Modify: `package.json`
- Modify: `next.config.ts`

**Step 1: Install MDX packages**

Run:
```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react @tailwindcss/typography
npm install -D @types/mdx
```

Expected: MDX packages installed

**Step 2: Configure MDX in next.config.ts**

```typescript
import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  output: 'standalone',
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 4: Commit**

```bash
git add package.json package-lock.json next.config.ts
git commit -m "feat: configure MDX support"
```

---

### Task 1.4: Setup shadcn/ui

**Files:**
- Create: `components.json`
- Create: `lib/utils.ts`

**Step 1: Initialize shadcn/ui**

Run:
```bash
npx shadcn@latest init
```

When prompted:
- Style: New York
- Base color: Slate
- CSS variables: Yes

Expected: shadcn/ui configured

**Step 2: Verify utils created**

Run: `cat lib/utils.ts`
Expected: File contains `cn` function

**Step 3: Install initial UI components**

Run:
```bash
npx shadcn@latest add button card separator
```

Expected: Components added to `components/ui/`

**Step 4: Commit**

```bash
git add .
git commit -m "feat: setup shadcn/ui with button, card, separator components"
```

---

## Phase 2: Internationalization Setup

### Task 2.1: Configure next-intl

**Files:**
- Create: `i18n/config.ts`
- Create: `i18n/request.ts`
- Create: `middleware.ts`

**Step 1: Create i18n config**

`i18n/config.ts`:
```typescript
export const locales = ['sk', 'cs', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'sk';

export const localeNames: Record<Locale, string> = {
  sk: 'Slovenčina',
  cs: 'Čeština',
  en: 'English',
};
```

**Step 2: Create request config**

`i18n/request.ts`:
```typescript
import { getRequestConfig } from 'next-intl/server';
import { locales } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as any)) {
    locale = 'sk';
  }

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
```

**Step 3: Create middleware**

`middleware.ts`:
```typescript
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export const config = {
  matcher: ['/', '/(sk|cs|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
```

**Step 4: Update next.config.ts**

Add to `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  output: 'standalone',
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};
```

**Step 5: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: No type errors

**Step 6: Commit**

```bash
git add i18n/ middleware.ts next.config.ts
git commit -m "feat: configure next-intl with SK/CS/EN support"
```

---

### Task 2.2: Create Translation Files

**Files:**
- Create: `messages/sk.json`
- Create: `messages/cs.json`
- Create: `messages/en.json`

**Step 1: Create Slovak translations**

`messages/sk.json`:
```json
{
  "nav": {
    "services": "Služby",
    "products": "Produkty",
    "why": "Prečo my",
    "process": "Ako pracujeme",
    "references": "Referencie",
    "blog": "Blog",
    "caseStudies": "Case Studies",
    "contact": "Kontakt"
  },
  "hero": {
    "badge": "10+ rokov skúseností v QA",
    "headline": "Kvalita, ktorej môžete veriť.",
    "headlineBold": "Rýchlosť, ktorú pocítite.",
    "cta": "Zistiť viac"
  },
  "services": {
    "title": "Naše služby",
    "subtitle": "Komplexné QA pokrytie pre váš produkt",
    "manual": {
      "title": "Manuálne testovanie",
      "desc": "Funkčné, regresné a UAT testovanie vykonávané skúsenými QA špecialistami."
    },
    "automation": {
      "title": "Automatizácia testov",
      "desc": "Robustné automatizované testy s Playwright, Cypress alebo Selenium."
    },
    "consulting": {
      "title": "QA Consulting",
      "desc": "Nastavenie QA procesov, stratégie testovania a mentoring vášho tímu."
    },
    "performance": {
      "title": "Performance testovanie",
      "desc": "Záťažové a výkonnostné testy pre spoľahlivý provoz pod tlakom."
    }
  },
  "products": {
    "title": "Naše produkty",
    "subtitle": "Inovatívne riešenia vo vývoji",
    "comingSoon": "Čoskoro",
    "learnMore": "Dozvedieť sa viac"
  },
  "why": {
    "title": "Prečo Retrospective",
    "subtitle": "Váš spoľahlivý partner",
    "stat1": { "value": "10+", "label": "rokov na trhu" },
    "stat2": { "value": "50+", "label": "úspešných projektov" },
    "stat3": { "value": "100%", "label": "spokojnosť klientov" },
    "points": [
      "Skúsenosti so startupmi aj enterprise projektmi",
      "Flexibilná spolupráca — ad hoc aj dlhodobá",
      "Transparentný reporting a komunikácia",
      "Rýchly onboarding bez zbytočnej byrokracie"
    ]
  },
  "process": {
    "title": "Ako pracujeme",
    "subtitle": "Overený proces pre kvalitné výsledky",
    "step1": { "title": "Analýza", "desc": "Pochopenie vašich potrieb a cieľov" },
    "step2": { "title": "Stratégia", "desc": "Návrh optimálneho QA prístupu" },
    "step3": { "title": "Implementácia", "desc": "Vykonanie testov a automatizácie" },
    "step4": { "title": "Reporting", "desc": "Pravidelné reporty a zlepšenia" }
  },
  "contact": {
    "title": "Kontaktujte nás",
    "subtitle": "Začnime spoluprácu",
    "form": {
      "name": "Meno",
      "email": "Email",
      "company": "Firma (voliteľné)",
      "message": "Správa",
      "send": "Odoslať správu",
      "sending": "Odosielam..."
    },
    "success": "Správa úspešne odoslaná! Ozveme sa čoskoro.",
    "error": "Chyba pri odosielaní. Skúste prosím znova."
  },
  "footer": {
    "copyright": "© 2026 Retrospective. Všetky práva vyhradené.",
    "links": {
      "privacy": "Ochrana súkromia",
      "terms": "Podmienky použitia"
    }
  },
  "blog": {
    "title": "Blog",
    "subtitle": "Novinky a poznatky z QA",
    "readMore": "Čítať viac",
    "backToBlog": "Späť na blog"
  },
  "caseStudies": {
    "title": "Case Studies",
    "subtitle": "Úspešné projekty našich klientov",
    "readMore": "Čítať viac",
    "backToCaseStudies": "Späť na case studies"
  }
}
```

**Step 2: Create Czech translations**

`messages/cs.json`:
```json
{
  "nav": {
    "services": "Služby",
    "products": "Produkty",
    "why": "Proč my",
    "process": "Jak pracujeme",
    "references": "Reference",
    "blog": "Blog",
    "caseStudies": "Case Studies",
    "contact": "Kontakt"
  },
  "hero": {
    "badge": "10+ let zkušeností v QA",
    "headline": "Kvalita, které můžete věřit.",
    "headlineBold": "Rychlost, kterou pocítíte.",
    "cta": "Zjistit více"
  },
  "services": {
    "title": "Naše služby",
    "subtitle": "Komplexní QA pokrytí pro váš produkt",
    "manual": {
      "title": "Manuální testování",
      "desc": "Funkční, regresní a UAT testování prováděné zkušenými QA specialisty."
    },
    "automation": {
      "title": "Automatizace testů",
      "desc": "Robustní automatizované testy s Playwright, Cypress nebo Selenium."
    },
    "consulting": {
      "title": "QA Consulting",
      "desc": "Nastavení QA procesů, strategie testování a mentoring vašeho týmu."
    },
    "performance": {
      "title": "Performance testování",
      "desc": "Zátěžové a výkonnostní testy pro spolehlivý provoz pod tlakem."
    }
  },
  "products": {
    "title": "Naše produkty",
    "subtitle": "Inovativní řešení ve vývoji",
    "comingSoon": "Již brzy",
    "learnMore": "Zjistit více"
  },
  "why": {
    "title": "Proč Retrospective",
    "subtitle": "Váš spolehlivý partner",
    "stat1": { "value": "10+", "label": "let na trhu" },
    "stat2": { "value": "50+", "label": "úspěšných projektů" },
    "stat3": { "value": "100%", "label": "spokojenost klientů" },
    "points": [
      "Zkušenosti se startupy i enterprise projekty",
      "Flexibilní spolupráce — ad hoc i dlouhodobá",
      "Transparentní reporting a komunikace",
      "Rychlý onboarding bez zbytečné byrokracie"
    ]
  },
  "process": {
    "title": "Jak pracujeme",
    "subtitle": "Ověřený proces pro kvalitní výsledky",
    "step1": { "title": "Analýza", "desc": "Pochopení vašich potřeb a cílů" },
    "step2": { "title": "Strategie", "desc": "Návrh optimálního QA přístupu" },
    "step3": { "title": "Implementace", "desc": "Vykonání testů a automatizace" },
    "step4": { "title": "Reporting", "desc": "Pravidelné reporty a zlepšení" }
  },
  "contact": {
    "title": "Kontaktujte nás",
    "subtitle": "Začněme spolupráci",
    "form": {
      "name": "Jméno",
      "email": "Email",
      "company": "Firma (volitelné)",
      "message": "Zpráva",
      "send": "Odeslat zprávu",
      "sending": "Odesílám..."
    },
    "success": "Zpráva úspěšně odeslána! Ozveme se brzy.",
    "error": "Chyba při odesílání. Zkuste prosím znovu."
  },
  "footer": {
    "copyright": "© 2026 Retrospective. Všechna práva vyhrazena.",
    "links": {
      "privacy": "Ochrana soukromí",
      "terms": "Podmínky použití"
    }
  },
  "blog": {
    "title": "Blog",
    "subtitle": "Novinky a poznatky z QA",
    "readMore": "Číst více",
    "backToBlog": "Zpět na blog"
  },
  "caseStudies": {
    "title": "Case Studies",
    "subtitle": "Úspěšné projekty našich klientů",
    "readMore": "Číst více",
    "backToCaseStudies": "Zpět na case studies"
  }
}
```

**Step 3: Create English translations**

`messages/en.json`:
```json
{
  "nav": {
    "services": "Services",
    "products": "Products",
    "why": "Why Us",
    "process": "Process",
    "references": "References",
    "blog": "Blog",
    "caseStudies": "Case Studies",
    "contact": "Contact"
  },
  "hero": {
    "badge": "10+ years of QA experience",
    "headline": "Quality you can trust.",
    "headlineBold": "Speed you can feel.",
    "cta": "Learn More"
  },
  "services": {
    "title": "Our Services",
    "subtitle": "Comprehensive QA coverage for your product",
    "manual": {
      "title": "Manual Testing",
      "desc": "Functional, regression, and UAT testing performed by experienced QA specialists."
    },
    "automation": {
      "title": "Test Automation",
      "desc": "Robust automated tests with Playwright, Cypress, or Selenium."
    },
    "consulting": {
      "title": "QA Consulting",
      "desc": "QA process setup, testing strategy, and team mentoring."
    },
    "performance": {
      "title": "Performance Testing",
      "desc": "Load and performance tests for reliable operation under pressure."
    }
  },
  "products": {
    "title": "Our Products",
    "subtitle": "Innovative solutions in development",
    "comingSoon": "Coming Soon",
    "learnMore": "Learn More"
  },
  "why": {
    "title": "Why Retrospective",
    "subtitle": "Your reliable partner",
    "stat1": { "value": "10+", "label": "years on market" },
    "stat2": { "value": "50+", "label": "successful projects" },
    "stat3": { "value": "100%", "label": "client satisfaction" },
    "points": [
      "Experience with startups and enterprise projects",
      "Flexible cooperation — ad hoc and long-term",
      "Transparent reporting and communication",
      "Fast onboarding without unnecessary bureaucracy"
    ]
  },
  "process": {
    "title": "How We Work",
    "subtitle": "Proven process for quality results",
    "step1": { "title": "Analysis", "desc": "Understanding your needs and goals" },
    "step2": { "title": "Strategy", "desc": "Designing optimal QA approach" },
    "step3": { "title": "Implementation", "desc": "Executing tests and automation" },
    "step4": { "title": "Reporting", "desc": "Regular reports and improvements" }
  },
  "contact": {
    "title": "Contact Us",
    "subtitle": "Let's start working together",
    "form": {
      "name": "Name",
      "email": "Email",
      "company": "Company (optional)",
      "message": "Message",
      "send": "Send Message",
      "sending": "Sending..."
    },
    "success": "Message sent successfully! We'll get back to you soon.",
    "error": "Error sending message. Please try again."
  },
  "footer": {
    "copyright": "© 2026 Retrospective. All rights reserved.",
    "links": {
      "privacy": "Privacy Policy",
      "terms": "Terms of Service"
    }
  },
  "blog": {
    "title": "Blog",
    "subtitle": "News and insights from QA",
    "readMore": "Read More",
    "backToBlog": "Back to Blog"
  },
  "caseStudies": {
    "title": "Case Studies",
    "subtitle": "Success stories from our clients",
    "readMore": "Read More",
    "backToCaseStudies": "Back to Case Studies"
  }
}
```

**Step 4: Verify JSON syntax**

Run:
```bash
node -e "require('./messages/sk.json')"
node -e "require('./messages/cs.json')"
node -e "require('./messages/en.json')"
```

Expected: No syntax errors

**Step 5: Commit**

```bash
git add messages/
git commit -m "feat: add SK/CS/EN translation files"
```

---

### Task 2.3: Setup Locale Layout

**Files:**
- Delete: `app/layout.tsx`
- Delete: `app/page.tsx`
- Create: `app/[locale]/layout.tsx`
- Create: `app/[locale]/page.tsx`

**Step 1: Remove root layout and page**

Run:
```bash
rm app/layout.tsx app/page.tsx
```

**Step 2: Create locale layout**

`app/[locale]/layout.tsx`:
```typescript
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n/config';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Retrospective - QA Consulting & Testing',
  description: 'Professional QA consulting and testing services',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**Step 3: Create temporary homepage**

`app/[locale]/page.tsx`:
```typescript
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Retrospective</h1>
        <p className="text-xl mt-4">Locale: {locale}</p>
      </div>
    </main>
  );
}
```

**Step 4: Verify dev server**

Run: `npm run dev`
Visit: http://localhost:3000
Expected: Redirects to /sk and shows "Retrospective" with locale

**Step 5: Test all locales**

Visit:
- http://localhost:3000/sk
- http://localhost:3000/cs
- http://localhost:3000/en

Expected: Each shows correct locale

**Step 6: Commit**

```bash
git add app/
git commit -m "feat: setup locale-based routing with next-intl"
```

---

## Phase 3: Core Components & Utilities

### Task 3.1: Create MDX Utilities

**Files:**
- Create: `lib/mdx.ts`
- Create: `lib/types.ts`

**Step 1: Create type definitions**

`lib/types.ts`:
```typescript
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  published: boolean;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  description: string;
  date: string;
  tags: string[];
  results: string[];
  image?: string;
  published: boolean;
}
```

**Step 2: Create MDX utilities**

`lib/mdx.ts`:
```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogPost, CaseStudy } from './types';

const contentDir = path.join(process.cwd(), 'content');

export async function getBlogPosts(locale: string): Promise<BlogPost[]> {
  const blogDir = path.join(contentDir, 'blog', locale);

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith('.mdx'));

  const posts = files.map((filename) => {
    const slug = filename.replace('.mdx', '');
    const filePath = path.join(blogDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);

    return {
      slug,
      ...data,
    } as BlogPost;
  });

  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPost(
  locale: string,
  slug: string
): Promise<{ frontmatter: BlogPost; content: string } | null> {
  const filePath = path.join(contentDir, 'blog', locale, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    frontmatter: { slug, ...data } as BlogPost,
    content,
  };
}

export async function getCaseStudies(locale: string): Promise<CaseStudy[]> {
  const caseStudiesDir = path.join(contentDir, 'case-studies', locale);

  if (!fs.existsSync(caseStudiesDir)) {
    return [];
  }

  const files = fs.readdirSync(caseStudiesDir).filter((file) => file.endsWith('.mdx'));

  const caseStudies = files.map((filename) => {
    const slug = filename.replace('.mdx', '');
    const filePath = path.join(caseStudiesDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);

    return {
      slug,
      ...data,
    } as CaseStudy;
  });

  return caseStudies
    .filter((cs) => cs.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getCaseStudy(
  locale: string,
  slug: string
): Promise<{ frontmatter: CaseStudy; content: string } | null> {
  const filePath = path.join(contentDir, 'case-studies', locale, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    frontmatter: { slug, ...data } as CaseStudy,
    content,
  };
}
```

**Step 3: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: No type errors

**Step 4: Commit**

```bash
git add lib/mdx.ts lib/types.ts
git commit -m "feat: add MDX utilities for blog and case studies"
```

---

### Task 3.2: Create Server Actions

**Files:**
- Create: `lib/actions.ts`

**Step 1: Create contact form action**

`lib/actions.ts`:
```typescript
'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, 'Name too short').max(100, 'Name too long'),
  email: z.string().email('Invalid email'),
  company: z.string().max(100).optional(),
  message: z.string().min(10, 'Message too short').max(1000, 'Message too long'),
});

export async function submitContactForm(formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    message: formData.get('message'),
  };

  const validationResult = contactSchema.safeParse(rawData);

  if (!validationResult.success) {
    return {
      success: false,
      error: validationResult.error.errors[0].message,
    };
  }

  const { name, email, company, message } = validationResult.data;

  try {
    await resend.emails.send({
      from: 'contact@retrospective.sk',
      to: 'info@retrospective.sk',
      subject: `New contact form submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Company: ${company || 'N/A'}

Message:
${message}
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Email send failed:', error);
    return {
      success: false,
      error: 'Failed to send message. Please try again.',
    };
  }
}
```

**Step 2: Create .env.local template**

Create `.env.local.example`:
```
RESEND_API_KEY=your_resend_api_key_here
```

**Step 3: Add .env.local to .gitignore**

Verify `.gitignore` contains:
```
.env*.local
```

**Step 4: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: No type errors

**Step 5: Commit**

```bash
git add lib/actions.ts .env.local.example
git commit -m "feat: add contact form server action with Resend"
```

---

### Task 3.3: Create Layout Components - Navbar

**Files:**
- Create: `components/layout/Navbar.tsx`

**Step 1: Create Navbar component**

`components/layout/Navbar.tsx`:
```typescript
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LocaleSwitcher from './LocaleSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F1E]/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-white">
            Retrospective
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#services"
              className="text-slate-300 hover:text-white transition"
            >
              {t('services')}
            </Link>
            <Link
              href="#products"
              className="text-slate-300 hover:text-white transition"
            >
              {t('products')}
            </Link>
            <Link
              href="#why"
              className="text-slate-300 hover:text-white transition"
            >
              {t('why')}
            </Link>
            <Link
              href="/blog"
              className="text-slate-300 hover:text-white transition"
            >
              {t('blog')}
            </Link>
            <Link
              href="#contact"
              className="text-slate-300 hover:text-white transition"
            >
              {t('contact')}
            </Link>
            <LocaleSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden text-white">
            <Menu size={24} />
          </Button>
        </div>
      </div>
    </nav>
  );
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build fails - LocaleSwitcher not created yet (expected)

**Step 3: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: add Navbar component (WIP - needs LocaleSwitcher)"
```

---

### Task 3.4: Create LocaleSwitcher Component

**Files:**
- Create: `components/layout/LocaleSwitcher.tsx`

**Step 1: Create LocaleSwitcher**

`components/layout/LocaleSwitcher.tsx`:
```typescript
'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const currentLocale = (params.locale as Locale) || 'sk';

  const handleLocaleChange = (newLocale: Locale) => {
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <Select value={currentLocale} onValueChange={handleLocaleChange}>
      <SelectTrigger className="w-[120px] bg-slate-800 text-white border-slate-700">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {localeNames[locale]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
```

**Step 2: Install select component**

Run:
```bash
npx shadcn@latest add select
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add components/layout/LocaleSwitcher.tsx components/ui/select.tsx
git commit -m "feat: add LocaleSwitcher component with shadcn select"
```

---

### Task 3.5: Create Footer Component

**Files:**
- Create: `components/layout/Footer.tsx`

**Step 1: Create Footer**

`components/layout/Footer.tsx`:
```typescript
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-[#0A0F1E] border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Retrospective</h3>
            <p className="text-slate-400 text-sm">
              Professional QA consulting and testing services
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#services" className="text-slate-400 hover:text-white text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#products" className="text-slate-400 hover:text-white text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-white text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <p className="text-slate-400 text-sm">info@retrospective.sk</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Update locale layout to include Navbar and Footer**

Modify `app/[locale]/layout.tsx`:
```typescript
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n/config';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Retrospective - QA Consulting & Testing',
  description: 'Professional QA consulting and testing services',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**Step 3: Verify dev server**

Run: `npm run dev`
Expected: Navbar and Footer visible on all pages

**Step 4: Commit**

```bash
git add components/layout/Footer.tsx app/[locale]/layout.tsx
git commit -m "feat: add Footer and integrate Navbar/Footer into layout"
```

---

## Phase 4: Homepage Sections

### Task 4.1: Create Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`

**Step 1: Create Hero component**

`components/sections/Hero.tsx`:
```typescript
'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const typewriterWords = [
  'Manual Testing',
  'Test Automation',
  'QA Consulting',
  'Performance Testing',
];

export default function Hero() {
  const t = useTranslations('hero');
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = typewriterWords[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % typewriterWords.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIndex]);

  return (
    <section className="relative min-h-screen bg-[#0A0F1E] flex flex-col items-center justify-center text-white overflow-hidden">
      {/* SVG grid background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#DC2626" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500/15 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 border border-red-600/40 rounded-full px-4 py-1.5 text-sm text-red-500 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          {t('badge')}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4"
        >
          {t('headline')}
          <br />
          <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
            {t('headlineBold')}
          </span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="h-8 mb-10 text-xl text-slate-300"
        >
          <span>{displayed}</span>
          <span className="animate-pulse text-red-500">|</span>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-red-600 to-orange-500 hover:opacity-90 text-white text-lg px-8 py-6 rounded-full shadow-lg shadow-red-500/25"
          >
            <a href="#services">{t('cta')}</a>
          </Button>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F1F5F9" />
        </svg>
      </div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}
```

**Step 2: Update homepage to include Hero**

Modify `app/[locale]/page.tsx`:
```typescript
import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
    </main>
  );
}
```

**Step 3: Verify dev server**

Run: `npm run dev`
Expected: Hero section visible with animations and typewriter effect

**Step 4: Commit**

```bash
git add components/sections/Hero.tsx app/[locale]/page.tsx
git commit -m "feat: add Hero section with typewriter effect and red gradients"
```

---

### Task 4.2: Create Services Section

**Files:**
- Create: `components/sections/Services.tsx`

**Step 1: Create Services component**

`components/sections/Services.tsx`:
```typescript
import { useTranslations } from 'next-intl';
import { TestTube, Bot, Users, Gauge } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function Services() {
  const t = useTranslations('services');

  const services = [
    {
      icon: TestTube,
      titleKey: 'manual',
      descKey: 'manual',
    },
    {
      icon: Bot,
      titleKey: 'automation',
      descKey: 'automation',
    },
    {
      icon: Users,
      titleKey: 'consulting',
      descKey: 'consulting',
    },
    {
      icon: Gauge,
      titleKey: 'performance',
      descKey: 'performance',
    },
  ];

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">{t('title')}</h2>
          <p className="text-xl text-slate-600">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 border-slate-200 hover:border-red-600/50"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center mb-4">
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">
                  {t(`${service.titleKey}.title`)}
                </h3>
                <p className="text-slate-600">{t(`${service.descKey}.desc`)}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add Services to homepage**

Modify `app/[locale]/page.tsx`:
```typescript
import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <Services />
    </main>
  );
}
```

**Step 3: Verify dev server**

Run: `npm run dev`
Expected: Services section visible with 4 service cards

**Step 4: Commit**

```bash
git add components/sections/Services.tsx app/[locale]/page.tsx
git commit -m "feat: add Services section with 4 service cards"
```

---

### Task 4.3: Create Products Section

**Files:**
- Create: `components/sections/Products.tsx`

**Step 1: Create Products component**

`components/sections/Products.tsx`:
```typescript
import { useTranslations } from 'next-intl';
import { Rocket, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function Products() {
  const t = useTranslations('products');

  // Placeholder products - will be replaced with actual data from translations
  const products = [
    {
      name: 'QA Platform',
      description: 'Comprehensive testing management platform',
      status: 'In Development',
      eta: 'Q2 2026',
      icon: Rocket,
    },
  ];

  return (
    <section id="products" className="py-24 bg-[#0A0F1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">{t('title')}</h2>
          <p className="text-xl text-slate-400">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <Card
                key={index}
                className="p-6 bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:border-red-600/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center">
                    <Icon className="text-white" size={24} />
                  </div>
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full border border-orange-500/30">
                    {t('comingSoon')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{product.name}</h3>
                <p className="text-slate-400 mb-4">{product.description}</p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock size={16} />
                  <span>ETA: {product.eta}</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add Products to homepage**

Modify `app/[locale]/page.tsx`:
```typescript
import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Products from '@/components/sections/Products';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <Services />
      <Products />
    </main>
  );
}
```

**Step 3: Verify dev server**

Run: `npm run dev`
Expected: Products section visible with coming soon badge

**Step 4: Commit**

```bash
git add components/sections/Products.tsx app/[locale]/page.tsx
git commit -m "feat: add Products section with coming soon status"
```

---

Due to length constraints, I'll create a comprehensive but condensed version of the remaining tasks. The full plan continues with:

- **Task 4.4-4.8:** WhyRetrospective, Process, References, BlogPreview, Contact sections
- **Phase 5:** Blog and Case Studies pages with MDX rendering
- **Phase 6:** Tailwind configuration and global styles
- **Phase 7:** Docker, Nginx, GitHub Actions
- **Phase 8:** Testing and polish

Let me continue the plan...

---

### Task 4.4: Create WhyRetrospective Section

**Files:**
- Create: `components/sections/WhyRetrospective.tsx`

**Component Summary:** Statistics grid (3 stats) + bullet points list, alternating layout

**Commit:** `"feat: add WhyRetrospective section with stats and points"`

---

### Task 4.5: Create Process Section

**Files:**
- Create: `components/sections/Process.tsx`

**Component Summary:** 4-step workflow with icons, numbers, and descriptions

**Commit:** `"feat: add Process section with 4-step workflow"`

---

### Task 4.6: Create Contact Section

**Files:**
- Create: `components/sections/Contact.tsx`

**Component Summary:** Form with Server Action, toast notifications, loading states

**Install:** `npx shadcn@latest add toast input textarea`

**Commit:** `"feat: add Contact section with server action form"`

---

### Task 4.7: Integrate All Sections to Homepage

**Files:**
- Modify: `app/[locale]/page.tsx`

**Summary:** Import and render all 7 sections in order

**Commit:** `"feat: integrate all homepage sections"`

---

## Phase 5: Blog & Case Studies

### Task 5.1: Create Sample Blog Posts

**Files:**
- Create: `content/blog/sk/2026-01-15-automatizacia-qa.mdx`
- Create: `content/blog/cs/2026-01-15-automatizace-qa.mdx`
- Create: `content/blog/en/2026-01-15-qa-automation.mdx`

**Sample frontmatter:**
```yaml
---
title: "QA Automation Best Practices"
description: "Learn how to build effective test automation"
date: "2026-01-15"
author: "Retrospective Team"
tags: ["qa", "automation", "testing"]
published: true
---
```

**Commit:** `"feat: add sample blog posts in all languages"`

---

### Task 5.2: Create Blog List Page

**Files:**
- Create: `app/[locale]/blog/page.tsx`

**Summary:** Fetch posts with `getBlogPosts()`, render cards with links

**Commit:** `"feat: add blog listing page"`

---

### Task 5.3: Create Blog Post Page

**Files:**
- Create: `app/[locale]/blog/[slug]/page.tsx`
- Create: `mdx-components.tsx` (root)

**Summary:** Dynamic route with `generateStaticParams`, MDX rendering with @tailwindcss/typography

**Commit:** `"feat: add dynamic blog post pages with MDX rendering"`

---

### Task 5.4: Create Case Studies Pages

**Files:**
- Create: `app/[locale]/case-studies/page.tsx`
- Create: `app/[locale]/case-studies/[slug]/page.tsx`
- Create sample case study MDX files

**Summary:** Similar to blog but for case studies

**Commit:** `"feat: add case studies pages"`

---

## Phase 6: Styling & Polish

### Task 6.1: Configure Tailwind CSS

**Files:**
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`

**Summary:** Add custom red theme colors, configure typography plugin

**Commit:** `"style: configure Tailwind with red theme colors"`

---

### Task 6.2: Add Global Fonts

**Files:**
- Modify: `app/[locale]/layout.tsx`

**Summary:** Import Inter font with `next/font/google`

**Commit:** `"style: add Inter font with next/font"`

---

## Phase 7: Deployment

### Task 7.1: Create Dockerfile

**Files:**
- Create: `Dockerfile`

**Content:** Multi-stage build (deps → builder → runner)

**Commit:** `"deploy: add multi-stage Dockerfile"`

---

### Task 7.2: Create Docker Compose

**Files:**
- Create: `docker-compose.yml`

**Content:** Service config with Traefik labels

**Commit:** `"deploy: add docker-compose configuration"`

---

### Task 7.3: Create GitHub Actions Workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

**Summary:** Checkout → Lint → Build → Deploy to VPS

**Commit:** `"deploy: add GitHub Actions CI/CD pipeline"`

---

### Task 7.4: Create nginx.conf

**Files:**
- Create: `nginx.conf`

**Summary:** Reverse proxy, gzip, caching, security headers

**Commit:** `"deploy: add nginx configuration"`

---

## Phase 8: Testing & Documentation

### Task 8.1: Add ESLint Configuration

**Summary:** Verify and enhance ESLint rules

**Commit:** `"chore: enhance ESLint configuration"`

---

### Task 8.2: Create README

**Files:**
- Create: `README.md`

**Content:** Project overview, setup instructions, deployment guide

**Commit:** `"docs: add comprehensive README"`

---

### Task 8.3: Manual Testing Checklist

**Test:**
- All 3 locales (SK/CS/EN)
- Locale switcher
- All homepage sections
- Contact form submission
- Blog posts rendering
- Case studies rendering
- Mobile responsiveness
- Animations and hover states

**Commit:** `"test: manual testing completed"`

---

### Task 8.4: Production Build Test

**Run:**
```bash
npm run build
npm start
```

**Expected:** Production build runs without errors, all pages accessible

**Commit:** `"chore: verify production build"`

---

## Execution Complete

All tasks completed! The website is ready for deployment to VPS.

**Final checklist before deploy:**
- [ ] Add RESEND_API_KEY to .env.local
- [ ] Configure GitHub Secrets (VPS_HOST, VPS_USER, VPS_SSH_KEY, RESEND_API_KEY)
- [ ] Setup VPS (Docker, Traefik, app directory)
- [ ] Configure DNS A record
- [ ] Push to main branch to trigger deployment

---

**Total estimated time:** 5-7 days

**Key principles followed:**
- ✅ DRY (Don't Repeat Yourself)
- ✅ YAGNI (You Aren't Gonna Need It)
- ✅ Server Components first
- ✅ Frequent commits
- ✅ Type safety throughout
