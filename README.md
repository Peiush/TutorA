# TutorA (TutorConnect)

**A personally-vetted online tutoring marketplace.** TutorA matches students, parents booking for their kids, and adult learners with tutors and courses that the TutorA team has reviewed before they go live. It is not an open marketplace where anyone can list themselves.

### 🔗 Live demo: **[www.tutora.it.com](https://www.tutora.it.com)**

---

## Table of contents

- [About the project](#about-the-project)
- [Key features](#key-features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Data model](#data-model)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Available scripts](#available-scripts)
- [Deployment](#deployment)
- [Security](#security)
- [SEO](#seo)
- [License](#license)

---

## About the project

Most tutoring platforms let anyone sign up and list themselves, which leaves families to sort through unverified profiles. TutorA takes the opposite approach:

1. **Every tutor and course is manually reviewed** by the TutorA team before it is published.
2. **Students browse for free, or submit a private request** and the team proposes a vetted tutor (about 31 hours on average).
3. **A single success fee is charged only after both sides confirm a match**, never before.
4. **A rematch guarantee** covers students whose first match doesn't work out.

The catalogue covers academic subjects (Grades 6–12 maths and sciences, SAT/ACT/AP/IB/A-Level test prep), programming, languages, music and creative skills. Each is offered as a one-on-one tutor match or as a structured course.

## Key features

### For students and parents
- **Find a Tutor:** browse verified tutor profiles with subject offerings, rates and reviews. Each tutor has a detailed profile page.
- **Courses and Subjects:** about 53 courses and about 103 subject pages, grouped by category, curriculum and grade band, with search and filtering.
- **Request a Tutor / Request a Course / Request a Subject:** private requests that the admin team matches by hand.
- **Personal dashboard:** track request status, and save tutors, courses and subjects.
- **Tutor reviews and testimonials:** reviews on tutor profiles and a public testimonials wall.
- **WhatsApp and email notifications** when requests are made or matched.

### For tutors
- **Become a Tutor application:** submit a profile that goes through admin review (`PENDING` → `APPROVED` / `REJECTED`).
- **Tutor dashboard** to manage the profile and see matched students.

### For admins
- **Admin console (`/admin`)** with panels for tutor review, users, courses, testimonials, and tutor/course/subject requests.
- **WhatsApp inbox:** inbound student replies from the WhatsApp Business webhook land in the admin panel.
- **Audit log** of sensitive admin actions.
- **TOTP two-factor authentication** for admin accounts, with backup codes. It is set up from the admin panel and enforced at login once enabled.
- **Bulk import:** load tutors and courses from an Excel template.

### Authentication and accounts
- Email + password sign-up and login, plus **Sign in with Google**.
- Phone OTP verification, and a self-service email change flow with an emailed verification code.
- Role-based access control for `STUDENT`, `TUTOR` and `ADMIN`.

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Server Components, Server Actions) |
| UI | React 19, Tailwind CSS 4, [GSAP](https://gsap.com) for scroll and reveal animation |
| Language | TypeScript 5 |
| Database | PostgreSQL (Neon) via [Prisma 7](https://www.prisma.io) with the `pg` driver adapter |
| Auth | [Auth.js / NextAuth v5](https://authjs.dev) (Credentials and Google, JWT sessions, Prisma adapter) |
| Validation | [Zod 4](https://zod.dev) |
| 2FA | `otplib` (TOTP) and `qrcode` |
| Notifications | WhatsApp Business Cloud API, Nodemailer (Gmail SMTP) |
| SEO tooling | Google Search Console API (`googleapis`), IndexNow |
| Hosting | [Vercel](https://vercel.com) |
| Runtime | Node.js 24.x |

> **Note:** this project uses a Next.js version with breaking changes from older releases. Before changing framework-level code, read the relevant guide in `node_modules/next/dist/docs/`. See [AGENTS.md](AGENTS.md).

## Project structure

```
TutorConnect/
├── app/                    # Next.js App Router
│   ├── page.tsx            #   Homepage
│   ├── find-a-tutor/       #   Tutor directory + [slug] profile pages
│   ├── courses/            #   Course hub + [slug] detail pages
│   ├── subjects/           #   Subject index + [slug] chooser pages
│   ├── request-a-tutor/    #   Private tutor request flow
│   ├── become-a-tutor/     #   Tutor application (admin review)
│   ├── teach/              #   "Teach on TutorA" landing page
│   ├── about/ guarantee/ testimonials/ terms/ privacy/
│   ├── dashboard/          #   Student dashboard
│   ├── tutor/              #   Tutor dashboard
│   ├── admin/              #   Admin console
│   ├── login/ signup/ complete-profile/
│   ├── api/                #   NextAuth route, WhatsApp webhook, dashboard state routes
│   ├── lib/actions/        #   Server Actions (auth, requests, reviews, admin, ...)
│   ├── sitemap.ts robots.ts opengraph-image.tsx
├── components/             # UI grouped by feature (find, courses, admin, dashboard, ...)
├── lib/                    # Shared logic: Prisma client, rate limiting, MFA, OTP,
│                           #   notifications (email/WhatsApp), content and FAQ data
├── prisma/                 # schema.prisma, migrations, seed script
├── scripts/                # Data import, content sync, GSC report, IndexNow
├── public/                 # Static assets, llms.txt
├── docs/                   # SEO audit reports and execution plan
├── auth.ts auth.config.ts  # Auth.js configuration
└── proxy.ts                # Route protection for gated areas
```

Public content pages (courses, subjects, tutors) are statically generated and revalidated. Only the gated areas (`/dashboard`, `/tutor`, `/admin`, `/become-a-tutor`) run through the auth proxy.

## Data model

Defined in [prisma/schema.prisma](prisma/schema.prisma). Main entities:

- **User, Account, Session, VerificationToken:** Auth.js tables, with a `Role` of `STUDENT`, `TUTOR` or `ADMIN`.
- **TutorProfile, TutorSubject, Subject, TutorReview:** tutor listings, the subjects they teach with their own rates, and reviews.
- **Course:** catalogue courses with category, level and grade band.
- **TutorRequest, CourseRequest, SubjectRequest:** student requests with a status lifecycle (`OPEN` → `MATCHED` → `CLOSED`).
- **SavedTutor, SavedCourse, SavedSubject:** dashboard bookmarks.
- **Testimonial:** public testimonials, moderated by admins.
- **PhoneOtp, EmailChangeRequest:** verification flows.
- **Conversation, WhatsAppMessage:** the admin WhatsApp inbox.
- **AuditLog:** a record of admin and security-relevant actions.

## Getting started

### Prerequisites

- **Node.js 24.x** and npm
- A **PostgreSQL** database (a local instance or a free [Neon](https://neon.tech) project)

### 1. Clone and install

```bash
git clone https://github.com/Peiush/TutorConnect.git
cd TutorConnect
npm install          # also runs `prisma generate`
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Fill in at least `DATABASE_URL` and `AUTH_SECRET` (generate one with `npx auth secret` or `openssl rand -base64 32`). The other variables are optional for local development. See [Environment variables](#environment-variables).

### 3. Set up the database

```bash
npx prisma migrate deploy   # apply all migrations
npx tsx prisma/seed.ts      # optional: load demo tutors (needs DATABASE_URL in your env)
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Creating an admin user

Sign up through the UI, then promote the account in the database (for example with `npx prisma studio`) by setting its `role` to `ADMIN`. Once promoted, you can enable TOTP two-factor authentication from the admin panel.

## Environment variables

Copy [.env.example](.env.example) for the full annotated list.

| Variable | Required | Purpose |
| --- | :---: | --- |
| `DATABASE_URL` | ✅ | PostgreSQL connection string (a pooled URL is fine at runtime) |
| `DATABASE_URL_UNPOOLED` | prod | Direct connection used by `prisma migrate` (Neon's pooler doesn't support migration locks) |
| `AUTH_SECRET` | ✅ | Secret used to sign Auth.js sessions |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | optional | Enables "Sign in with Google". The redirect URI is `<origin>/api/auth/callback/google` |
| `APP_ORIGINS` | optional | Extra allowed hostnames when served behind a proxy or CDN |
| `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_BUSINESS_ACCOUNT_ID`, `WHATSAPP_VERIFY_TOKEN`, `WHATSAPP_APP_SECRET`, `ADMIN_WHATSAPP_NUMBER` | optional | WhatsApp Business Cloud API notifications and the admin inbox |
| `GMAIL_USER` / `GMAIL_APP_PASSWORD` | optional | Gmail SMTP (use an App Password) for verification-code emails |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | optional | Google Search Console service-account JSON, used by `gsc:report` |

> Never commit `.env*` files. They are already in `.gitignore`.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run dev:clean` | Clear the dev cache, then start the dev server |
| `npm run build` | Apply migrations (`prisma migrate deploy`) and build for production |
| `npm start` | Run the production build |
| `npm run lint` | Lint with ESLint |
| `npm run import:template` | Generate the Excel import template for tutors and courses |
| `npm run import:data` | Import tutors and courses from the filled-in Excel template |
| `npm run gsc:report` | Pull a Google Search Console performance report |
| `npm run indexnow` | Submit the sitemap URLs to IndexNow |

## Deployment

The live site is deployed on **Vercel** with a **Neon** Postgres database:

1. Import the repository in Vercel.
2. Add the environment variables above (the Vercel–Neon integration provides `DATABASE_URL` and `DATABASE_URL_UNPOOLED` automatically).
3. Deploy. `npm run build` runs `prisma migrate deploy` first, so the schema is always up to date.

## Security

- Role-gated routes enforced in the Auth.js `authorized` callback (admins can access every gated area).
- Short-lived JWT sessions (12 hours) to limit how long a changed role stays live.
- Passwords hashed with `bcryptjs`. Admin accounts can enable TOTP 2FA, which is then required at login.
- Rate limiting on sensitive actions, with input validated by Zod.
- WhatsApp webhook payloads are verified using the Meta app-secret signature.
- Admin and security-relevant actions are written to an audit log.

## SEO

TutorA is built to be search- and AI-friendly:

- Server-rendered course, subject and tutor pages (roughly 190 URLs) with a generated `sitemap.xml` and `robots.txt`
- Per-page metadata, canonical URLs, and dynamic Open Graph images
- JSON-LD structured data (Organization, WebSite, BreadcrumbList, FAQPage, Course, ItemList and more)
- [`public/llms.txt`](public/llms.txt) for AI crawlers
- Audit reports and the execution plan in [docs/seo-audit-tutora/](docs/seo-audit-tutora/)

## License

This is a private project and no license has been granted. All rights reserved.
