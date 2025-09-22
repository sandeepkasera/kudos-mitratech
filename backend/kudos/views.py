from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User, Kudo, Organization
from .serializers import UserSerializer, KudoSerializer
from django.contrib.auth import authenticate
from .utils import weekly_remaining
from django.shortcuts import get_object_or_404

@api_view(["POST"])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(request, username=username, password=password)
    if user:
        serializer = UserSerializer(user)
        return Response({"user": serializer.data})
    return Response({"detail": "invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(["GET", "PUT", "PATCH"])
def me_view(request):
    uid = request.query_params.get("user_id")
    user = get_object_or_404(User, id=uid)

    if request.method in ("PUT", "PATCH"):
        # allow updating first_name and last_name only for now
        first = request.data.get("first_name")
        last = request.data.get("last_name")
        changed = False
        if first is not None:
            user.first_name = first
            changed = True
        if last is not None:
            user.last_name = last
            changed = True
        if changed:
            user.save()

    data = UserSerializer(user).data
    data["weekly_remaining"] = weekly_remaining(user)
    return Response(data)


@api_view(["GET"])
def sent_kudos(request):
    user_id = request.query_params.get("user_id")
    user = get_object_or_404(User, id=user_id)
    qs = user.kudos_sent.select_related("recipient").order_by("-created_at")
    serializer = KudoSerializer(qs, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def users_list(request):
    org = request.query_params.get("org_id")
    # By default we exclude admin/staff/superuser accounts from recipient lists
    qs = User.objects.filter(is_staff=False, is_superuser=False)
    if org:
        qs = qs.filter(organization_id=org)
    serializer = UserSerializer(qs, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def give_kudo(request):
    sender_id = request.data.get("sender_id")
    recipient_id = request.data.get("recipient_id")
    message = request.data.get("message", "")
    sender = get_object_or_404(User, id=sender_id)
    recipient = get_object_or_404(User, id=recipient_id)

    if sender.id == recipient.id:
        return Response({"detail": "Cannot give kudo to yourself"}, status=400)
    if weekly_remaining(sender) <= 0:
        return Response({"detail": "No kudos left this week"}, status=400)

    k = Kudo.objects.create(sender=sender, recipient=recipient, message=message)
    return Response(KudoSerializer(k).data, status=201)

@api_view(["GET"])
def received_kudos(request):
    user_id = request.query_params.get("user_id")
    user = get_object_or_404(User, id=user_id)
    qs = user.kudos_received.select_related("sender").order_by("-created_at")
    serializer = KudoSerializer(qs, many=True)
    return Response(serializer.data)
