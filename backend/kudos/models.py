from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class Organization(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class User(AbstractUser):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.username

class Kudo(models.Model):
    sender = models.ForeignKey("kudos.User", on_delete=models.CASCADE, related_name="kudos_sent")
    recipient = models.ForeignKey("kudos.User", on_delete=models.CASCADE, related_name="kudos_received")
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Kudo from {self.sender} to {self.recipient} at {self.created_at}"
