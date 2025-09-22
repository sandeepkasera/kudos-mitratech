#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from pathlib import Path
from dotenv import load_dotenv


def main():
    """Run administrative tasks."""
    # load .env if present so the PORT env var is available
    BASE_DIR = Path(__file__).resolve().parent
    dotenv_path = BASE_DIR / '.env'
    if dotenv_path.exists():
        load_dotenv(dotenv_path)

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kudos_backend.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    # If the user runs `python manage.py runserver` without a port, default to PORT env var
    if len(sys.argv) >= 2 and sys.argv[1] == 'runserver' and len(sys.argv) == 2:
        port = os.getenv('PORT', '8000')
        # bind to all interfaces by default for convenience in dev: 0.0.0.0:PORT
        sys.argv += [f"0.0.0.0:{port}"]

    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
