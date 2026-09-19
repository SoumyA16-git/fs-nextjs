# Full Stack Open - Part 14: Next.js Blog App

[![End-to-End Tests](https://github.com/SoumyA16-git/fs-nextjs/actions/workflows/playwright.yml/badge.svg)](https://github.com/SoumyA16-git/fs-nextjs/actions/workflows/playwright.yml)

A complete full stack application built for **Full Stack Open Part 14: Next.js**, implementing exercises 14.0 through 14.25.

## Tech Stack

- **Framework**: Next.js 14 (App Router & React Server Components)
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: NextAuth.js with Credentials Provider & bcryptjs
- **Styling**: Tailwind CSS
- **Testing**: Playwright End-to-End Test Suite
- **CI/CD**: GitHub Actions with native PostgreSQL service container

---

## Implemented Exercises (14.0 - 14.25)

- **14.0**: Warm up Next.js configuration.
- **14.1**: Blog list with server components.
- **14.2**: New blog creation page (`/blogs/new`).
- **14.3**: Individual blog page (`/blogs/[id]`).
- **14.4**: Like button with server actions & dynamic updates.
- **14.5**: Blogs rendered in order by likes and id.
- **14.6**: Search and filtering by title and author.
- **14.7**: Production build optimization and deployment ready.
- **14.8**: Drizzle ORM schema, relations, and database client.
- **14.9**: Users table and listing (`/users`).
- **14.10**: Individual user page (`/users/[id]`) showing blogs created.
- **14.11**: NextAuth credentials authentication with bcrypt password hashing (`/login`).
- **14.12**: User registration with server actions (`/register`).
- **14.13**: Input validation in blog creation (title, author, url >= 5 chars).
- **14.14**: Retain form inputs on validation error.
- **14.15**: Server-side validation in registration (min length, password match, unique username).
- **14.16**: Styled notification system with React Context and auto-dismiss.
- **14.17**: Complete UI styling with Tailwind CSS.
- **14.18**: User profile page (`/me`) with API token generation.
- **14.19**: Token-authenticated route handler (`/api/me`).
- **14.20**: Personal reading list and "add to reading list" button.
- **14.21**: Organized reading list with unread and read sections and "mark as read".
- **14.22**: Static markdown homepage rendered from `content/home.md`.
- **14.23**: Testing route handlers (`DELETE /api/testing/reset` and `POST /api/testing/users`).
- **14.24**: Automated Playwright end-to-end test suite passing in CI.
- **14.25**: GitHub submission repository configuration.

---

## Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment**:
   Create a `.env.local` file:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/test_db?sslmode=disable"
   NEXTAUTH_SECRET="your_nextauth_secret_key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. **Push database schema**:
   ```bash
   npx drizzle-kit push
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Run tests**:
   ```bash
   npx playwright test
   ```
