# Valtiren Systems — v1.0

Company site built on **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · PostgreSQL (Prisma) · Docker**.

The landing page UI is a structural replication of the reference layout: a
250vh scroll-driven hero, the suite/solutions grid, a logo marquee, an
asymmetric services block, a CTA with a database-backed demo form, and a
four-column footer.

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

## Replacing the placeholder art

`RoomPlate` and `ScreenContent` in
[ScrollHero.tsx](src/components/site/ScrollHero.tsx) are CSS/SVG stand-ins that
establish the composition and the display's rect. Drop real assets in `public/`
and swap `RoomPlate` for an `<Image>`; keep the display's percentage box
(`left 26.4% / top 18.6% / 47.2% × 63.4%`) aligned with wherever the screen
falls in your photograph, and the seated-screen coordinates in the zoom layer
will line up.

---

## Notes

- **Hosting.** This repo is named `*.github.io`, but GitHub Pages serves static
  files only — it cannot run the API routes or reach Postgres. Deploy the
  container to a host that runs Node (Vercel, Fly.io, Railway, Cloud Run), or
  strip the dynamic routes and export statically.
- **Content and brand.** Copy, names, and logos here are original Valtiren
  placeholders. The reference site's text, imagery, and logotype are its
  owner's property — replicate layout and interaction patterns, not assets.

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | production build (standalone output) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run db:migrate` | create + apply a migration |
| `npm run db:studio` | Prisma Studio |
