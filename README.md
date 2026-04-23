# Caelus AI by Ecodev LLC

A Next.js app scaffold for the Caelus AI marketing site and client portal.

## What is included

- Marketing homepage with Caelus AI branding
- Services, About, Contact, and legal pages
- Client portal shell with secure messaging UI
- Tailwind + Clerk-ready app layout

## Next steps

1. Install dependencies:
   ```bash
   npm install
   ```
2. Add Clerk environment variables to `.env.local`:
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx
   CLERK_SECRET_KEY=sk_live_xxx
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/portal
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/portal
   ```
3. Run the app locally:
   ```bash
   npm run dev
   ```

## Deployment

Push this repo to GitHub and connect it to Vercel. Add the same environment variables in Vercel and deploy the app.
