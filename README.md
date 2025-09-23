# Kudos - Simple Peer-to-Peer Recognition App

This repository contains a small web application for sending and receiving "kudos" (peer recognition). It is split into two parts:
**Note: I used macOS to build this app. If you're using Windows, use the equivalent Windows commands for the same actions.**

- `backend/` — Django + Django REST Framework API
- `frontend/` — React + Vite single-page application

This README gives a quick overview and pointers to each subproject's README for full setup instructions.

Quick project summary
- Users belong to organizations and can send kudos (short messages) to colleagues.
- The backend enforces a weekly sending limit (configurable) and exposes endpoints for authentication, users, and kudos.
- The frontend provides login/signup, a dashboard to send/receive kudos, profile and settings pages.

Get started (quick)

1) Backend (open a terminal)

```bash
cd backend
# create and activate virtualenv
python3 -m venv .venv
or
py -m venv .venv #windows

# On MacOS (PowerShell):
source .venv/bin/activate
# On Windows (PowerShell):
.\.venv\Scripts\Activate.ps1
# On Windows (CMD):
.\.venv\Scripts\activate.bat
# install deps
pip install -r requirements.txt
# apply migrations
python3 manage.py migrate
# run dev server (reads PORT from backend/.env)
python3 manage.py runserver
```

For full backend details see `backend/README.md`.

2) Frontend (open another terminal)

```bash
cd frontend
# install node deps
npm install
# start dev server
npm run dev
```

For full frontend details see `frontend/README.md`.

Development notes
- The frontend uses `VITE_API_BASE_URL` to locate the backend API. See `frontend/README.md` for example `.env`.
- The backend loads a local `.env` (if present) for `SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`, and `PORT`.
