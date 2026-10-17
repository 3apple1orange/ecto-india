# ECTO India website

Next.js static export, hosted on Cloudflare Pages. Forms are handled by
Cloudflare Pages Functions in `/functions` and sent with Resend.

## Develop

```bash
npm install
npm run dev
```

In development the rider and driver forms do not send anything. They log the
sign-up to the browser console and show the success message.

## Build

```bash
npm run build   # static site in /out
```

## Cloudflare Pages settings

- Build command: `npm run build`
- Build output directory: `out`
- Production branch: `main`
- Environment variable `NODE_VERSION`: `20` (or newer)

Variables and Secrets (production):

| Name | Value |
|---|---|
| `RESEND_API_KEY` | Resend API key (Secret) |
| `CONTACT_TO_EMAIL` | `contact@ectoindia.com` |
| `CONTACT_FROM_EMAIL` | `ECTO INDIA <noreply@ectoindia.com>` (only after the domain is verified in Resend) |

Only the production branch is indexable by search engines. Preview builds
are `noindex` (see `src/lib/env.ts`).

## Forms

| Form | Endpoint | Function |
|---|---|---|
| Early rider | `POST /api/rider` | `functions/api/rider.js` |
| Driver early access | `POST /api/driver` | `functions/api/driver.js` |

Validation rules live in `src/lib/leads.ts` and are repeated in each function.
The city list is in `src/lib/site.ts`. Keep all three in sync.

## Test functions locally (optional)

```bash
npm run build
npx wrangler pages dev out
```

Put local keys in `.dev.vars` (git-ignored), same names as above.