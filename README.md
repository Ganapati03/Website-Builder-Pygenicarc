# Website Builder Frontend

Last updated: March 23, 2026

This project is a React single-page application focused on website creation and publishing workflows.
It includes a visual builder canvas, project hub, theme controls, block presets, and preview/live-view pages.

## Current Scope

| Area | Status | Notes |
|---|---|---|
| Login and Register screens | Complete | Auth UI and guarded routes are active |
| Auth state management | Demo implementation | Session storage based context (not real Firebase yet) |
| Creator navigation | Complete | Site Builder, Project Hub, Settings |
| Project Hub | Complete | Lists saved projects from local storage |
| Visual Builder | Complete | Drag/drop sections, inspector, theme controls |
| Live View route | Complete | Standalone preview route without app chrome |
| Asset Library route | Present | Route exists and page is available |
| Chat route | Disabled | Import exists but route is commented out |
| Backend integration | Pending | No production backend flow for publish/deploy |

## Tech Stack

| Package | Role |
|---|---|
| React 19 | UI runtime |
| react-router-dom 7 | Client routing |
| Vite 7 | Dev server and build |
| Tailwind CSS 4 | Styling |
| dnd-kit | Drag and drop interactions |
| framer-motion | Animations |
| lucide-react | Icons |
| monaco editor react | Code editor integrations |
| axios | HTTP client utilities |

## Quick Start

1. Install dependencies: npm install
2. Create or update .env file in this folder
3. Start dev server: npm run dev

Default local URL is usually http://localhost:5173.

## Environment

Current variable in use:

- VITE_API_BASE_URL=http://localhost:8000/api/v1

## Scripts

| Command | Description |
|---|---|
| npm run dev | Start development server |
| npm run build | Create production build |
| npm run preview | Preview production build |
| npm run lint | Run ESLint |
| npm run lint:fix | Auto-fix lint issues |
| npm run format | Run Prettier write |
| npm run format:check | Check formatting |
| npm run test | Run tests |
| npm run test:watch | Run tests in watch mode |
| npm run test:coverage | Run tests with coverage |
| npm run test:ui | Open Vitest UI |

## Actual Route Map

Defined in src/app/routes.jsx:

| Path | Component | Notes |
|---|---|---|
| /login | Login | Public |
| /register | Register | Public |
| /session/signin | Redirect | Redirects to /login |
| /session/signup | Redirect | Redirects to /register |
| / | Redirect | Redirects to /projects |
| /dashboard | DashboardRouter | Redirects to /projects |
| /projects | Projects | Protected |
| /settings | Settings | Protected |
| /builder | BuilderPage | Protected |
| /assets | AssetLibrary | Protected |
| /view/:id | BuilderPage live view | Protected standalone mode |
| /404 | NotFound | Public |
| * | NotFound | Public fallback |

Note: Chat page exists under pages/Chat, but the /chat route is currently commented out.

## Actual Page Folders

Current pages directory contains:

- src/app/pages/Auth
- src/app/pages/Builder
- src/app/pages/Chat
- src/app/pages/Settings

## Navigation Model

Creator role sees:

- Site Builder at /builder
- Project Hub at /projects

All authenticated roles see:

- Settings at /settings

Source: src/app/navigations.js

## Data and Persistence

- Auth session uses session storage key alumni_session
- Project data uses local storage key builder_projects
- Deploy and publish flows are currently UI-first with placeholder actions

## Important Clarification

The file named FirebaseAuthContext.jsx currently implements demo session logic and not real Firebase SDK authentication.

## Troubleshooting

| Problem | Fix |
|---|---|
| Route not opening | Check src/app/routes.jsx for redirects and commented routes |
| Projects missing | Confirm local storage key builder_projects exists |
| Login state resets on tab close | Expected with session storage based auth |
| API errors | Verify VITE_API_BASE_URL and backend availability |
| Build or import errors | Reinstall dependencies with npm install |
