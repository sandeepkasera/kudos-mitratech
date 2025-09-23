# Frontend (React + Vite)

This repository contains the frontend app built with React and Vite. It communicates with the Django backend via a small REST API.

This README covers:
- Local setup and installation
- Environment variables (`VITE_API_BASE_URL`)
- Common npm scripts (dev, build, preview)
- How to run the frontend together with the backend

## Prerequisites
- Node.js 18+ (or a compatible LTS version)
- npm or yarn

## 1) Install dependencies

From the `frontend` directory:

```bash
# using npm
npm install

# or using yarn
yarn install
```

## 2) Environment variables

Create a `.env` file in the `frontend` folder (it's safe to commit environment values that are not secret; keep secrets out of the repo).

Example `.env` (used by the app):

```env
# Base API URL for the backend (note: Vite exposes vars prefixed with VITE_)
VITE_API_BASE_URL=http://localhost:8000/api/
```

The app reads `import.meta.env.VITE_API_BASE_URL` in the code to communicate with the backend.

## 3) Start development server

```bash
# development with HMR
npm run dev
```

The dev server is typically available at `http://localhost:5173`.

## 4) Build for production

```bash
npm run build

# preview the production build locally
npm run preview
```

## 5) Running frontend + backend together (local dev)

Start the frontend as described above (`npm run dev`). For backend setup and how to run the Django server, see the backend README at:

```
../backend/README.md
```
(It includes instructions for installing Python dependencies, applying migrations and starting the dev server.)

## 6) Useful scripts
- `npm run dev` — start Vite dev server
- `npm run build` — build production assets
- `npm run preview` — preview production build locally

## 7) Linting / formatting

If ESLint / Prettier are configured, run them via the scripts in `package.json` (if present), e.g. `npm run lint`.

## 8) Notes
- The frontend uses environment variables prefixed with `VITE_` which are replaced at build time by Vite.
- If you change `VITE_API_BASE_URL`, restart the dev server (`npm run dev`) to pick up new values.


