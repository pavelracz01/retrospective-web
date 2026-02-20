# Retrospective Website

A modern, multilingual website for Retrospective, a Slovak QA consulting company specializing in quality assurance, testing, and process optimization.

## Overview

This website showcases Retrospective's services, products, and expertise in software quality assurance. Built with Next.js 16 and React 19, it features a clean, professional design with a distinctive red theme and comprehensive multilingual support.

## Features

- **Multi-language Support**: Full internationalization (i18n) with Slovak, Czech, and English
- **Responsive Design**: Mobile-first approach with Tailwind CSS v4
- **Content Management**: MDX-powered blog and case studies
- **Interactive Sections**:
  - Hero section with call-to-action
  - Services showcase
  - Products presentation
  - Why choose Retrospective
  - QA process overview
  - Contact form with email integration
- **Server-Side Rendering**: Optimized performance with Next.js App Router
- **Form Validation**: Zod-based validation for contact forms
- **Email Integration**: Resend API for contact form submissions
- **Production Ready**: Docker deployment with Traefik reverse proxy
- **CI/CD Pipeline**: Automated deployment via GitHub Actions

## Tech Stack

### Core

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

### Styling

- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library

### Internationalization

- **[next-intl](https://next-intl-docs.vercel.app/)** - i18n for Next.js

### Content & Forms

- **[MDX](https://mdxjs.com/)** - Markdown with JSX for blog and case studies
- **[Zod](https://zod.dev/)** - Schema validation
- **[Resend](https://resend.com/)** - Transactional email API
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications

## Prerequisites

- **Node.js** 20 or higher
- **npm** or **yarn** package manager
- **Resend API Key** for email functionality (optional for development)

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd retrospective-web
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the project root:

```bash
RESEND_API_KEY=your_resend_api_key_here
```

> **Note**: You can use the `.env.local.example` file as a template.

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

The website will be available in all supported languages:
- English: `http://localhost:3000/en`
- Slovak: `http://localhost:3000/sk`
- Czech: `http://localhost:3000/cs`

## Available Scripts

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix

## Project Structure

```
retrospective-web/
├── app/                      # Next.js App Router
│   ├── [locale]/            # Locale-based routing
│   │   ├── blog/            # Blog pages
│   │   ├── case-studies/    # Case study pages
│   │   ├── layout.tsx       # Root layout with providers
│   │   └── page.tsx         # Homepage
│   ├── favicon.ico          # Site favicon
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── Footer.tsx           # Site footer
│   ├── LocaleSwitcher.tsx   # Language switcher
│   └── Navbar.tsx           # Navigation bar
├── content/                 # MDX content
│   ├── blog/                # Blog posts (en, sk, cs)
│   └── case-studies/        # Case studies (en, sk, cs)
├── i18n/                    # Internationalization config
│   ├── routing.ts           # Locale routing config
│   └── request.ts           # Request configuration
├── lib/                     # Utilities and helpers
│   ├── actions.ts           # Server actions
│   ├── mdx.ts               # MDX utilities
│   └── utils.ts             # General utilities
├── messages/                # Translation files
│   ├── en.json              # English translations
│   ├── sk.json              # Slovak translations
│   └── cs.json              # Czech translations
├── public/                  # Static assets
│   └── images/              # Image files
├── .env.local.example       # Environment variables template
├── docker-compose.yml       # Docker Compose configuration
├── Dockerfile               # Docker image configuration
├── mdx-components.tsx       # MDX component overrides
├── middleware.ts            # Next.js middleware for i18n
└── next.config.ts           # Next.js configuration
```

## Environment Variables

### Required for Production

- `RESEND_API_KEY` - API key for Resend email service (get one at [resend.com](https://resend.com))

### Optional

- `NODE_ENV` - Set to `production` for production builds (automatically set by Next.js)
- `PORT` - Server port (defaults to 3000)

## Deployment

### Docker Deployment

The project includes Docker support for production deployments.

#### Build and Run with Docker

```bash
# Build the Docker image
docker build -t retrospective-web .

# Run the container
docker run -p 3000:3000 -e RESEND_API_KEY=your_api_key retrospective-web
```

#### Docker Compose with Traefik

The project is configured to work with Traefik as a reverse proxy for SSL/TLS termination.

1. Ensure you have a Traefik network set up:

```bash
docker network create web
```

2. Update `docker-compose.yml` with your domain:

```yaml
- "traefik.http.routers.retrospective.rule=Host(`your-domain.com`)"
```

3. Set up environment variables:

```bash
export RESEND_API_KEY=your_api_key
```

4. Deploy:

```bash
docker-compose up -d
```

### GitHub Actions CI/CD

The project includes automated deployment via GitHub Actions.

#### Required Secrets

Configure the following secrets in your GitHub repository settings:

- `VPS_HOST` - Your VPS hostname or IP address
- `VPS_USERNAME` - SSH username
- `VPS_SSH_KEY` - Private SSH key for authentication
- `RESEND_API_KEY` - Resend API key (if needed on the server)

#### Workflow

The deployment workflow (`.github/workflows/deploy.yml`) automatically:

1. Runs on push to `main` branch
2. Lints the codebase
3. Builds the application
4. Deploys to VPS via SSH
5. Rebuilds and restarts Docker containers

Update the deployment path in `.github/workflows/deploy.yml`:

```yaml
script: |
  cd /your/deployment/path
  git pull origin main
  docker-compose down
  docker-compose up -d --build
```

## Design System

### Color Scheme

The website features a distinctive red-themed design:

- **Primary Red**: Used for CTAs, headings, and accents
- **Dark Background**: Professional dark theme
- **White/Gray Text**: High contrast for readability

### Typography

- Clean, modern font stack optimized for readability
- Hierarchical heading structure
- Responsive font sizes

### Components

Built with shadcn/ui for consistency and accessibility:

- Buttons
- Cards
- Forms
- Navigation
- Toasts/Notifications

## Content Management

### Adding Blog Posts

Create MDX files in `content/blog/{locale}/`:

```markdown
---
title: "Your Blog Post Title"
description: "Brief description"
date: "2026-02-20"
author: "Author Name"
---

Your content here...
```

### Adding Case Studies

Create MDX files in `content/case-studies/{locale}/`:

```markdown
---
title: "Case Study Title"
description: "Brief description"
client: "Client Name"
industry: "Industry"
date: "2026-02-20"
---

Your content here...
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow the existing TypeScript/React conventions
- Run `npm run lint` before committing
- Use meaningful commit messages
- Keep components small and focused

## License

All rights reserved - Retrospective

## Support

For issues and questions, please contact Retrospective support or open an issue in the repository.

---

Built with by Retrospective Team
