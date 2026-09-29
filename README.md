# KNORX Technologies website

Next.js website with a server-side contact endpoint. Use Node.js 20 or later.

## Site structure

The primary routes are `/`, `/services`, `/work`, `/approach`, `/about`, and `/contact`; `/privacy` explains contact-form data handling. Shared navigation and footer live in `app/components`. Approved service copy lives in `app/services.ts`, and project names, statuses, and homepage content live in `app/content.ts`. Project visuals are labeled system illustrations, not product screenshots. Individual case-study routes can be added when verified project details and imagery are available.

## Local setup

1. Run `npm ci`.
2. Copy `.env.example` to `.env.local` and set the values below. Never commit `.env.local` or a real credential.
3. Run `npm run dev`.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | A newly issued Resend API key. Do not reuse the credential previously tracked in this repository. |
| `CONTACT_FROM_EMAIL` | Sender address accepted by the configured Resend account. The API adds the KNORX display name. For initial testing, `.env.example` uses `onboarding@resend.dev`; configure a sender on a verified KNORX domain when one is available. |
| `CONTACT_TO_EMAIL` | Monitored inbox that receives website inquiries. For the current staging setup, use `helloknorx@gmail.com`. The API reads this from the environment. |
| `SITE_URL` | Exact deployed Netlify HTTPS origin, such as `https://your-site.netlify.app`, without a path. Enables canonical and absolute social metadata. Leave unset until the assigned URL is known. |

## Temporary Netlify staging setup

KNORX does not currently have a custom domain. Do not configure a custom domain or a sender address as though KNORX owns it. In Netlify's environment settings, set `RESEND_API_KEY` to a newly issued key, `CONTACT_TO_EMAIL` to `helloknorx@gmail.com`, `CONTACT_FROM_EMAIL` to a sender accepted by your Resend account, and `SITE_URL` to the actual Netlify deployment origin. The example sender `onboarding@resend.dev` passes this application's email validation, but provider delivery and recipient restrictions still need to be checked in the deployed account. Set the same values in ignored `.env.local` for local testing. Keep real keys out of `.env.example` and other tracked files.

The contact endpoint returns a safe delivery error when mail configuration is missing. Test a real inquiry to the configured inbox and verify Reply-To in the deployed environment before announcing the contact form. The public email and form failure fallback currently use `helloknorx@gmail.com`.

## Checks

Run `npm run lint`, `npx tsc --noEmit --incremental false`, `npm test`, and `npm run build`.

The endpoint limits JSON bodies to 12 KB and uses a small per-process rate limiter: five requests per source address and 100 overall per 15 minutes. This limits simple abuse on one process; it is not shared across serverless instances. At deployment, use the hosting provider's trusted proxy headers and add a shared edge or WAF limit if traffic warrants it. The form also includes a hidden honeypot. Server logs record delivery failure categories without submission contents or provider errors.

The `/privacy` page describes the contact form's current data path. KNORX should review it against its actual hosting, inbox retention, and legal obligations before launch.
