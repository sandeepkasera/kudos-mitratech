from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Organization, Kudo

admin.site.register(Organization)
admin.site.register(Kudo)
admin.site.register(User, UserAdmin)
