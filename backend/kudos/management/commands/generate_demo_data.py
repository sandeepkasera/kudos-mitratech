from django.core.management.base import BaseCommand
from kudos.models import Organization, User, Kudo
from faker import Faker
import random
from django.utils import timezone
from datetime import timedelta

fake = Faker()

class Command(BaseCommand):
    help = "Generate demo orgs, users, and kudos (randomized)"

    def add_arguments(self, parser):
        parser.add_argument("--orgs", type=int, default=2)
        parser.add_argument("--users-per-org", type=int, default=6)
        parser.add_argument("--max-kudos", type=int, default=20)

    def handle(self, *args, **options):
        orgs_count = options["orgs"]
        users_per_org = options["users_per_org"]
        max_kudos = options["max_kudos"]

        Organization.objects.all().delete()
        User.objects.all().delete()
        Kudo.objects.all().delete()

        orgs = []
        for _ in range(orgs_count):
            org = Organization.objects.create(name=fake.company()[:30])
            orgs.append(org)

        users = []
        for org in orgs:
            for _ in range(users_per_org):
                username = fake.user_name() + str(random.randint(1,9999))
                u = User.objects.create_user(username=username, password="password123", first_name=fake.first_name(), last_name=fake.last_name(), organization=org)
                users.append(u)

        for _ in range(random.randint(max(5, int(max_kudos/2)), max_kudos)):
            sender = random.choice(users)
            candidates = [u for u in users if u.organization == sender.organization and u.id != sender.id]
            if not candidates:
                continue
            recipient = random.choice(candidates)
            message = fake.sentence(nb_words=random.randint(4,14))
            created_at = timezone.now() - timedelta(days=random.randint(0,21), hours=random.randint(0,23))
            Kudo.objects.create(sender=sender, recipient=recipient, message=message, created_at=created_at)

        self.stdout.write(self.style.SUCCESS("Demo data generated"))
        self.stdout.write(f"Users: {len(users)}, Orgs: {len(orgs)}, Kudos: {Kudo.objects.count()}")
