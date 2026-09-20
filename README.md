# Full Stack Open — Part 14: Next.js Blog App

[![End-to-End Tests](https://github.com/SoumyA16-git/fs-nextjs/actions/workflows/playwright.yml/badge.svg)](https://github.com/SoumyA16-git/fs-nextjs/actions/workflows/playwright.yml)

A complete full stack application built for **Part 14: Next.js** of the University of Helsinki [Full Stack Open](https://fullstackopen.com/) course, strictly implementing all exercises **14.0 through 14.25**.

---

## 🔗 Repository & Monorepo Links

- **Dedicated Part 14 Repository**: [https://github.com/SoumyA16-git/fs-nextjs](https://github.com/SoumyA16-git/fs-nextjs)
- **Course Monorepo (Main)**: [https://github.com/SoumyA16-git/fullstackopen](https://github.com/SoumyA16-git/fullstackopen)
- **Monorepo Submodule (Part 14)**: [https://github.com/SoumyA16-git/fullstackopen/tree/main/part14](https://github.com/SoumyA16-git/fullstackopen/tree/main/part14)
- **GitHub Actions CI Test Suite**: [https://github.com/SoumyA16-git/fs-nextjs/actions](https://github.com/SoumyA16-git/fs-nextjs/actions)

---

## 📚 Previous Parts & Submissions

| Part | Topic | Repository / Submission Links | Status |
| :--- | :--- | :--- | :--- |
| **Part 13** | Relational Databases | [SoumyA16-git/fs-relational-databases](https://github.com/SoumyA16-git/fs-relational-databases) | ✅ Completed (13.0 - 13.27) |
| **Part 12** | Containers (Docker) | [SoumyA16-git/fs-containers](https://github.com/SoumyA16-git/fs-containers) | ✅ Completed (12.0 - 12.24) |
| **Part 11** | CI/CD | [SoumyA16-git/fs-pokedex](https://github.com/SoumyA16-git/fs-pokedex) & [fullstackopen-bloglist-ci](https://github.com/SoumyA16-git/fullstackopen-bloglist-ci) | ✅ Completed (11.0 - 11.23) |
| **Part 10** | React Native | [fullstackopen/part10](https://github.com/SoumyA16-git/fullstackopen/tree/main/part10/rate-repository-app) | ✅ Completed (10.0 - 10.28) |
| **Part 9** | TypeScript | [fullstackopen/part9](https://github.com/SoumyA16-git/fullstackopen/tree/main/part9) | ✅ Completed (9.0 - 9.30) |
| **Part 8** | GraphQL | [fullstackopen/part8](https://github.com/SoumyA16-git/fullstackopen/tree/main/part8) | ✅ Completed (8.0 - 8.26) |
| **Part 7** | React Router & Custom Hooks | [fullstackopen/part7](https://github.com/SoumyA16-git/fullstackopen/tree/main/part7) | ✅ Completed (7.0 - 7.21) |
| **Part 6** | Redux & React Query | [fullstackopen/part6](https://github.com/SoumyA16-git/fullstackopen/tree/main/part6) | ✅ Completed (6.0 - 6.24) |
| **Part 5** | Testing React Apps | [fullstackopen/part5](https://github.com/SoumyA16-git/fullstackopen/tree/main/part5) | ✅ Completed (5.0 - 5.23) |
| **Part 4** | Testing Express & Auth | [fullstackopen/part4](https://github.com/SoumyA16-git/fullstackopen/tree/main/part4) | ✅ Completed (4.0 - 4.23) |
| **Part 3** | Node.js & Express | [fullstackopen/part3](https://github.com/SoumyA16-git/fullstackopen/tree/main/part3) | ✅ Completed (3.0 - 3.22) |
| **Part 2** | Communicating with Server | [fullstackopen/part2](https://github.com/SoumyA16-git/fullstackopen/tree/main/part2) | ✅ Completed (2.0 - 2.20) |
| **Part 1** | Introduction to React | [fullstackopen/part1](https://github.com/SoumyA16-git/fullstackopen/tree/main/part1) | ✅ Completed (1.0 - 1.14) |
| **Part 0** | Fundamentals of Web Apps | [fullstackopen/part0](https://github.com/SoumyA16-git/fullstackopen/tree/main/part0) | ✅ Completed (0.0 - 0.6) |

---

## 📋 Exercises Index (14.0 – 14.25)

| Exercise | Name | Implementation & Artifacts | Status |
|---|---|---|---|
| **14.0** | Warm up | Next.js 14, React 18, TypeScript, Tailwind CSS configuration | ✅ Completed |
| **14.1** | Blog list | Server Component data fetching & `BlogsClient` with `data-testid="blogs-list"` | ✅ Completed |
| **14.2** | New blog | `/blogs/new` page with exact labels (`Title`, `Author`, `URL`) and `create-blog-button` | ✅ Completed |
| **14.3** | Blog page | `/blogs/[id]` dynamic page with `blog-detail`, `blog-title`, `blog-author` | ✅ Completed |
| **14.4** | Like button | Server Action `likeBlog` incrementing likes with `data-testid="like-button"` | ✅ Completed |
| **14.5** | Rendered in order | Blogs sorted by likes descending and ID descending | ✅ Completed |
| **14.6** | Search | Client filter input `filter-input` and `search-button` matching title/author | ✅ Completed |
| **14.7** | Deploy to Vercel | Production build configuration (`npm run build` zero errors) | ✅ Completed |
| **14.8** | DrizzleORM & database | PostgreSQL schema with `drizzle-orm`, `pg.Pool`, and migrations | ✅ Completed |
| **14.9** | Users | `/users` overview page displaying users and created blog counts | ✅ Completed |
| **14.10** | User page | `/users/[id]` individual user detail page listing created blogs | ✅ Completed |
| **14.11** | Login | NextAuth CredentialsProvider with `bcryptjs` in `/login` (`login-button`, `error-message`) | ✅ Completed |
| **14.12** | Registration | `/register` page and Server Action `registerUser` with password hashing | ✅ Completed |
| **14.13** | Validations in blog creation | Input validation enforcing title, author, url length >= 5 chars | ✅ Completed |
| **14.14** | Blog creation form on error | Retains previous form values on validation failure (`defaultValue`) | ✅ Completed |
| **14.15** | Validations in registration | Validation for min lengths, password match, unique user (`username-error`, `passwordConfirm-error`) | ✅ Completed |
| **14.16** | Styled notification | React Context `NotificationContext` with auto-dismiss `data-testid="notification"` | ✅ Completed |
| **14.17** | More styling | Complete responsive UI styling with Tailwind CSS | ✅ Completed |
| **14.18** | My page with API token | `/me` page with profile (`user-profile`, `user-name`, `user-username`) and token generation | ✅ Completed |
| **14.19** | Token-authenticated API | Route Handler `GET /api/me` with `Bearer <token>` authentication | ✅ Completed |
| **14.20** | Reading list | Personal reading list table, auto-add on blog creation, `add-to-reading-list-button` | ✅ Completed |
| **14.21** | Better reading list | `/me` divided into `unread-section` & `read-section`, `mark-read-${id}`, `no-unread-blogs` | ✅ Completed |
| **14.22** | Static homepage from markdown | Static home page `/` rendering markdown from `content/home.md` with remark | ✅ Completed |
| **14.23** | Finishing touches | Test endpoints `DELETE /api/testing/reset` & `POST /api/testing/users` with production guards | ✅ Completed |
| **14.24** | The final check | 28/28 Playwright E2E tests passing in GitHub Actions CI against PostgreSQL 17 | ✅ Completed |
| **14.25** | GitHub repository | Published repository [SoumyA16-git/fs-nextjs](https://github.com/SoumyA16-git/fs-nextjs) | ✅ Completed |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router & React Server Components)
- **Database ORM**: [Drizzle ORM](https://orm.drizzle.team/) with [PostgreSQL](https://www.postgresql.org/)
- **Authentication**: [NextAuth.js v4](https://next-auth.js.org/) & [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Testing**: [Playwright](https://playwright.dev/) End-to-End Test Suite (28 tests)
- **CI/CD**: GitHub Actions with native `postgres:17` service container

---

## 🧪 Local Testing & Running

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env.local` file:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/test_db?sslmode=disable"
   NEXTAUTH_SECRET="test_nextauth_secret_key_123456789"
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

5. **Run Playwright tests locally**:
   ```bash
   npx playwright test
   ```
