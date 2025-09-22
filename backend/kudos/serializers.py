from rest_framework import serializers
from .models import User, Organization, Kudo

class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ("id", "name")

class UserSerializer(serializers.ModelSerializer):
    organization = OrganizationSerializer(read_only=True)
    class Meta:
        model = User
        fields = ("id", "username", "first_name", "last_name", "organization")

class KudoSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    recipient = UserSerializer(read_only=True)
    sender_id = serializers.IntegerField(write_only=True, required=False)
    recipient_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Kudo
        fields = ("id", "sender", "recipient", "message", "created_at", "sender_id", "recipient_id")

    def create(self, validated_data):
        sender_id = validated_data.pop("sender_id")
        recipient_id = validated_data.pop("recipient_id")
        sender = User.objects.get(id=sender_id)
        recipient = User.objects.get(id=recipient_id)
        return Kudo.objects.create(sender=sender, recipient=recipient, **validated_data)
