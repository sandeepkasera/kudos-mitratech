from django.utils import timezone
from datetime import timedelta

def current_week_range(dt=None):
    dt = dt or timezone.now()
    start = dt - timedelta(days=dt.weekday())
    start = start.replace(hour=0, minute=0, second=0, microsecond=0)
    end = start + timedelta(days=7)
    return start, end

def kudos_given_in_current_week(user):
    start, end = current_week_range()
    return user.kudos_sent.filter(created_at__gte=start, created_at__lt=end).count()

def weekly_remaining(user, limit=3):
    used = kudos_given_in_current_week(user)
    return max(limit - used, 0)
