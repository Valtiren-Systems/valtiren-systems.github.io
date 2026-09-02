# Valtiren Systems — v1.0.1

Company site built on **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · PostgreSQL (Prisma) · Docker**.

---

## Quick start (local)

```bash
npm install
cp .env.example .env          # PowerShell: Copy-Item .env.example .env
npx prisma generate
npm run dev                   # http://localhost:3000
```

The landing page renders without a database. The demo form needs Postgres —
start one with `docker compose up -d db`, then `npx prisma migrate dev --name init`.

## Full stack via Docker

```bash
docker compose up --build
```

Brings up Postgres 16 and the app. The web service runs `prisma migrate deploy`
before booting, and the container healthcheck polls `/api/health`.

---

## Layout

```
src/
  app/
    layout.tsx              root shell, Poppins, metadata
    page.tsx                landing page composition
    globals.css             design tokens + component classes
    api/leads/route.ts      POST — validated, honeypot-guarded lead capture
    api/health/route.ts     GET  — liveness + DB readiness
  components/site/          Nav, ScrollHero, SuiteSection, LogoMarquee,
                            ServicesSection, CtaSection, Footer, Reveal, icons
  lib/
    content.ts              all landing-page copy in one place
    db.ts                   Prisma singleton (HMR-safe)
prisma/schema.prisma        Lead model + LeadStatus enum
```

### Design tokens

Measured from the reference at a 1440px viewport and declared in
`globals.css` under `@theme`:

| Token | Value | Use |
|---|---|---|
| `--color-lime` | `#dafa0b` | primary button, accents |
| `--color-violet` | `#671eff` | solution icons, services heading |
| `--color-ink` | `#05060a` | page ground |
| `--color-ink-raised` | `#060810` | suite / marquee / CTA sections |
| `--color-midnight` | `#040208` | text on white |
| `.shell` | `max-width: 1325px` | content rail |
| gutters | `57.6px` | section side padding |

Type scales by `vw` from the 1440px reference, wrapped in `clamp()` so the
measured value is the desktop ceiling and small screens stay readable.

### How the hero works

`ScrollHero` is a 250vh track with a `sticky` 100vh stage. A scroll listener
writes eased progress (0→1) to a `--p` CSS custom property; every transform
interpolates off that variable, so animation stays on the compositor and React
never re-renders per frame. `prefers-reduced-motion` pins `--p` to 1.

---

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | production build (standalone output) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run db:migrate` | create + apply a migration |
| `npm run db:studio` | Prisma Studio |
