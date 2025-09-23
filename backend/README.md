(The file `/Users/sandeepkumar/Developer/Kudos-mitratech/backend/README.md` exists, but is empty)
# Kudos Backend

This is the Django backend for the Kudos application. It serves a small REST API used by the frontend.

## What this README covers
- Local development setup
- Installing Python dependencies (`requirements.txt`)
- Environment variables (`.env`) and common values
- Running migrations and starting the development server
- Notes for deployment and security

---

## Prerequisites
- Python 3.11+ (this project was developed with Python 3.11+)
- pip (or pipx/virtualenv)
- Git

## 1) Clone the repository

```bash
git clone https://github.com/sandeepkasera/kudos-mitratech.git
cd Kudos-mitratech/backend
```

## 2) Create and activate a virtual environment

macOS / Linux (zsh/bash):

```bash
python -m venv .venv
source .venv/bin/activate
```

Windows (PowerShell):

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

## 3) Install Python requirements

All required packages are listed in `requirements.txt` at the project root of this `backend` folder.

```bash
pip install -r requirements.txt
```

This will install Django, Django REST Framework, django-cors-headers, Faker (used by demo data), and `python-dotenv` which is used to load a `.env` file in development.

## 4) Configure environment variables (`.env`)

There is a sample `.env` file used for local development at `backend/.env`. It contains values such as `SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`, and `PORT`.

Example `.env` contents:

```env
SECRET_KEY=your-dev-secret-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
PORT=8000
```

Important:
- Do **not** commit a real secret key to version control. For production, set environment variables via your deployment system or secrets manager.
- `ALLOWED_HOSTS` should be a comma-separated list of hostnames when `DEBUG=False`.

## 5) Database migrations

Apply migrations before running the server:

```bash
python manage.py migrate
```

Create a superuser for admin access (optional):

```bash
python manage.py createsuperuser
```

## 6) Running the development server

The project reads `PORT` from `backend/.env` and defaults to `8000`.

Start server using the default port from `.env`:

```bash
python manage.py runserver
```

Or override the bind address and port on the command line:

```bash
python manage.py runserver 8000
```

The API will be available at:

```
http://localhost:8000/api/
```

## 7) Optional: generate demo data

This project includes a management command to generate demo data (see `kudos/management/commands/generate_demo_data.py`).

```bash
python manage.py generate_demo_data
```

## 8) CORS / Allowed origins

During development the frontend runs on `http://localhost:5173`. The backend enables CORS for local development, but if you change the frontend origin or deploy to different domains, update the `CORS_ALLOWED_ORIGINS` and `ALLOWED_HOSTS` accordingly.

## 9) Production notes
- Set `DEBUG=False` and use a secure `SECRET_KEY` from your environment or secrets manager.
- Use a production-grade database (Postgres/MySQL) and configure `DATABASES` in `settings.py` or via `DATABASE_URL` environment variables.
- Serve static files using `whitenoise` or your web server.
- Do not store secrets in the repository; add `backend/.env` to `.gitignore` and use a deployment secrets store.

## 10) Troubleshooting
- If you see an ImportError for `dotenv`, make sure `python-dotenv` is in your environment: `pip install python-dotenv`.
- If the server fails to start with "address already in use", change the `PORT` in `.env` or run with a different port on the command line.

