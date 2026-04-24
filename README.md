This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Immaculate Baseball — Project Reference

### Tech stack

| What | Details |
|------|---------|
| Framework | Next.js 16 (App Router) — handles web pages and backend API in one project |
| Language | TypeScript — JavaScript with type checking |
| Styling | Tailwind CSS v4 + inline style overrides; brand color is Carolina blue `#4b9cd3` |
| Database | PostgreSQL managed through Prisma (a tool that translates code into database queries) |
| Payments | Stripe Checkout — parents pay on Stripe's site; Stripe notifies this app via webhook |
| Auth | JWT tokens stored in a browser cookie; admin-only, no parent accounts |

### Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start the local development server at http://localhost:3000 |
| `npm run build` | Compile the app for production |
| `npm run lint` | Check code for common errors |
| `npm run db:migrate` | Apply any pending database schema changes |
| `npm run db:push` | Push schema changes without creating a migration file |
| `npm run db:seed` | Load camp weeks and create the default admin account into the database |
| `npm run db:studio` | Open a visual database browser in your browser |

### Folder structure

| Folder / File | What's inside |
|---------------|---------------|
| `app/` | Every page and API endpoint |
| `app/admin/` | Admin-only pages: login, registration list, registration editor |
| `app/api/` | Backend logic: registration, Stripe payment, admin login/logout |
| `components/` | Reusable UI pieces: Header, Footer, admin logout button |
| `lib/` | Shared utilities: database connection (`prisma.ts`), login helpers (`auth.ts`) |
| `prisma/` | Database blueprint (`schema.prisma`) and seed script |
| `public/` | Static files: logo, images |
| `proxy.ts` | Route gatekeeper — blocks unauthenticated access to `/admin` |
| `.env.example` | Template of all required secret keys — copy to `.env` and fill in real values |

### Non-obvious gotchas

- **Stripe webhook:** When a parent pays, Stripe sends a notification to `/api/stripe/webhook`. Without it, registrations stay in PENDING status forever. In local development you must run `stripe listen --forward-to localhost:3000/api/stripe/webhook` in a separate terminal for payments to confirm.
- **Capacity counting:** Only PAID registrations count against a camp week's spot limit. PENDING registrations (started but not yet paid) do not hold spots, so two parents can simultaneously reach the payment step for the last spot.
- **Tailwind v4 quirk:** This project uses Tailwind CSS version 4, which stores theme settings inside CSS files rather than a config file. The brand color is written as an inline style in several places because of this.
- **Middleware renamed:** Next.js 16 renamed `middleware.ts` to `proxy.ts`. The export inside must be named `proxy`. This is easy to break if following older docs or examples.
- **Default admin account:** The seed script creates a default admin account. Change the password immediately on any real server before going live.
- **No parent accounts:** Parents do not log in. They register, pay via Stripe, and receive a confirmation page. All post-payment management is handled through the admin dashboard.
