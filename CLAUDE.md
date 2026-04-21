# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev           # Start Next.js dev server at http://localhost:3000

# Database
npm run db:migrate    # Run Prisma migrations (creates/updates tables)
npm run db:push       # Push schema changes without creating a migration file
npm run db:seed       # Seed camp weeks and admin user
npm run db:studio     # Open Prisma Studio GUI

# Build & deploy
npm run build
npm start             # Run production server
npm run lint
```

## First-time setup

```bash
cp .env.example .env
# Fill in DATABASE_URL, Stripe keys, JWT_SECRET, NEXT_PUBLIC_BASE_URL
createdb immaculate_baseball   # or use psql
npm run db:migrate
npm run db:seed
# Admin: admin@immaculatebaseball.com / admin123 — change after first login
```

## Stripe webhooks (local dev)

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET` in `.env`.

## Architecture

Full-stack Next.js 16 App Router app with PostgreSQL via Prisma. No separate backend — API routes live alongside pages.

### Key directories

| Path | Purpose |
|------|---------|
| `app/` | All pages and API routes (App Router) |
| `app/api/` | Backend API routes |
| `app/admin/` | Protected admin dashboard (server components + client forms) |
| `components/` | Shared client components (Header, Footer, AdminLogoutButton) |
| `lib/prisma.ts` | Prisma client singleton |
| `lib/auth.ts` | JWT helpers using `jose` — `signAdminToken`, `verifyAdminToken`, `getAdminSession` |
| `proxy.ts` | Route protection for `/admin/*` and `/api/admin/*` (Next.js 16 renamed middleware → proxy; export must be named `proxy`) |
| `prisma/schema.prisma` | Database schema |
| `prisma/seed.ts` | Seeds 9 camp weeks (June–August 2026) and one admin user |

### Data models

- **CampWeek** — name, date range, price (cents), maxSpots, isActive
- **Registration** — parent + player info, status (PENDING/PAID/CANCELLED), stripeSessionId, notes
- **RegistrationCampWeek** — join table (one registration → many camp weeks)
- **AdminUser** — single admin, email + bcrypt password hash

### Registration flow

1. `GET /api/camp-weeks` → returns available weeks with `spotsRemaining` (only PAID registrations count toward capacity)
2. Parent selects weeks + fills form → `POST /api/register` → creates PENDING registration
3. `POST /api/stripe/create-session` → creates Stripe Checkout session, stores sessionId
4. Redirect to Stripe → on success, Stripe calls `POST /api/stripe/webhook`
5. Webhook verifies signature, updates registration to PAID

### Authentication

Admin-only JWT auth via `jose`. Token stored in `httpOnly` cookie (`admin_token`). Middleware verifies the token on every request to `/admin/*` and `/api/admin/*` (except `/admin/login`). No user accounts — parents do not log in.

### Design system

Carolina blue (`#4b9cd3`) is the primary brand color. White background. All inline style overrides use this hex directly since Tailwind v4 uses `@theme inline` instead of `tailwind.config.ts`. The admin layout intentionally does not share the public Header/Footer — it has its own minimal header defined inline.
