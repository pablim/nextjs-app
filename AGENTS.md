# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Build & Dev Commands

- **Dev server (HTTPS):** `npm run dev` (uses `next dev --experimental-https`)
- **Build:** `npm run build`
- **Start production:** `npm start`
- **Lint:** `npm run lint` (ESLint with `next/core-web-vitals`)
- **Custom HTTPS server:** `node server.js` (requires `.cert/key.pem` and `.cert/cert.pem`)

There is no test runner configured in `package.json`. The existing snapshot tests in `components/` use Jest conventions but no test script is defined.

## Architecture

This is a **Next.js 15** app using the **Pages Router** (`pages/` directory, not App Router). React 18.

### API Layer (`api/`)

Two communication paths to the backend at `NEXT_PUBLIC_API_URL`:

- **REST** — `api/Rest.js` wraps Axios with auth token from `localStorage`, ETag handling, and centralized error handling. `api/ApiHelper.js` provides a `helper(commonURL)` factory that returns `[post, get]` bound to a base path.
- **GraphQL** — `api/Graphql.js` uses `graphql-request` for simple queries. Apollo Client (`@apollo/client`) is used in `graphql/` and some pages for queries, subscriptions (`graphql-ws`), and cache.

Service modules live in `api/services/` (e.g., `Users.js`, `Auth.js`, `Checkout.js`) and import from `api/Api.js`, which re-exports both `request` (REST) and `query` (GraphQL).

### Per-Page Layout Pattern

Layouts are in `layouts/` and exported via `layouts/index.js`. Pages compose layouts by nesting them directly in JSX (e.g., `<PageLayout><MainLayout>...</MainLayout></PageLayout>`). The `_app.js` supports `Component.getLayout` for per-page layouts, though most pages use direct nesting instead.

- **PageLayout** — sidebar navigation + main content area
- **MainLayout** — page header, message display, loading state
- **Page2Layout** — alternate layout variant

### Responsive SCSS Convention

Components and pages use a three-file SCSS pattern for responsive styles:

- `styles/style.module.scss` — imports `xm.scss` and `md.scss`
- `styles/xm.scss` — mobile-first styles (`min-width: 0`)
- `styles/md.scss` — medium+ breakpoint (`min-width: 768px`)

CSS Modules (`.module.scss` / `.module.css`) are used for scoped styles. Tailwind CSS is also configured but used alongside SCSS modules. Global styles are in `styles/globals.css`.

### Form System (`formDefinitions/` + `components/Form`)

Forms are data-driven: field definitions are declared as arrays of objects in `formDefinitions/` (with `label`, `name`, `type`, `info`, `required`, etc.). The `Form` component renders these definitions using `react-hook-form`, automatically choosing `Input` or `Select` based on the field's `type` or `value` being an array.

### Shared Components (`components/`)

Barrel-exported via `components/index.js`. Always import from the barrel: `import { Table, Form, Modal } from "../../components"`.

### Templates (`templates/`)

Page-level content wrappers (e.g., `Template` provides `topContent` + `content` slots with navigation). Exported via `templates/index.js`.

### Authentication

NextAuth.js (`next-auth`) is configured in `pages/api/auth/[...nextauth].js` with Google and GitHub providers. The SessionProvider in `_app.js` is currently commented out. REST API calls attach a Bearer token from `localStorage`.

### Local Library

`@pablovaz/jsprojlib` is transpiled via `next.config.js` (`transpilePackages`). `yalc` is used for local package development (`@pablovaz/minha-biblioteca`).

## Key Conventions

- Language is mixed: UI labels and code comments are predominantly in **Portuguese (pt-BR)**, while code identifiers are in English.
- Pages use `.jsx` extension; API/utility modules use `.js`.
- The project uses both MUI (`@mui/material`) and Bootstrap alongside Tailwind and custom SCSS — follow the styling approach used in the specific area being modified.
